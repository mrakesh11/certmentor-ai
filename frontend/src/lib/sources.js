/**
 * Human labels for official AWS documentation URLs.
 *
 * A raw URL is accurate but hostile to read in a list, so we derive two
 * things from it: a short page title and the host it lives on. Only
 * structure that is genuinely present in the URL is used — nothing is
 * fetched, inferred from page content, or invented. Anything we cannot
 * parse simply falls back to the URL itself.
 *
 * docs.aws.amazon.com pages are shaped:
 *   /<product>/<version>/<guide>/<page>.html
 * aws.amazon.com pages are shaped:
 *   /<product>/   (sometimes deeper)
 */

const TITLES = {
    'iam': 'IAM',
    's3': 'Amazon S3',
    'ec2': 'Amazon EC2',
    'vpc': 'Amazon VPC',
    'lambda': 'AWS Lambda',
    'rds': 'Amazon RDS',
    'dynamodb': 'Amazon DynamoDB',
    'cloudfront': 'Amazon CloudFront',
    'route53': 'Route 53',
    'cloudwatch': 'Amazon CloudWatch',
    'cloudtrail': 'AWS CloudTrail',
    'cloudformation': 'AWS CloudFormation',
    'ecs': 'Amazon ECS',
    'eks': 'Amazon EKS',
    'efs': 'Amazon EFS',
    'autoscaling': 'EC2 Auto Scaling',
    'elastic-load-balancing': 'Elastic Load Balancing',
    'elb': 'Elastic Load Balancing',
    'waf': 'AWS WAF',
    'shield': 'AWS Shield',
    'kms': 'AWS KMS',
    'secretsmanager': 'AWS Secrets Manager',
    'organizations': 'AWS Organizations',
    'billing': 'AWS Billing',
    'costexplorer': 'AWS Cost Explorer',
    'trustedadvisor': 'AWS Trusted Advisor',
    'support': 'AWS Support',
    'wellarchitected': 'Well-Architected',
    'aws-faqs': 'AWS FAQs',
};

/**
 * Turn a path slug into readable words.
 *
 * Handles the three shapes AWS actually uses: kebab/snake case
 * ("well-architected"), camelCase product slugs ("AmazonS3") and plain
 * lowercase words. Runs an initialism pass last so acronyms AWS writes in
 * capitals (ID, VPC, S3) survive the normalisation.
 */
function humanize(slug) {
    const words = String(slug)
        .replace(/\.html?$/i, '')
        // Split camelCase before lowercasing: "AmazonS3" → "Amazon S3".
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);

    // Terms AWS consistently writes as capitals; matched case-insensitively
    // so "id" in a path and "ID" in prose both render correctly.
    const ACRONYMS = new Set(['id', 'vpc', 's3', 'iam', 'ec2', 'efs', 'ecs', 'eks', 'waf', 'rds', 'api', 'faq']);

    return words
        .map((word) => {
            const lower = word.toLowerCase();
            if (ACRONYMS.has(lower)) return lower.toUpperCase();
            if (word.length <= 3 && word === word.toLowerCase() && words.length === 1) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

/**
 * Short page title for a documentation URL.
 * Returns null when the URL cannot be parsed, so callers can fall back.
 */
export function sourceLabel(url) {
    if (typeof url !== 'string' || url.length === 0) return null;

    let parsed;
    try {
        parsed = new URL(url);
    } catch {
        return null;
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return parsed.hostname;

    if (parsed.hostname === 'docs.aws.amazon.com') {
        // <product>/<version>/<guide>/<page>.html
        const page = segments[segments.length - 1];
        const product = segments[0];
        const productLabel = TITLES[product] ?? humanize(product);

        if (page.endsWith('.html') || page.includes('.')) {
            const pageLabel = humanize(page);
            // "Amazon S3 User Guide" reads better than a bare page slug, but
            // skip the repetition when the page title already names the product.
            if (pageLabel.toLowerCase().startsWith(productLabel.toLowerCase())) {
                return pageLabel;
            }
            return `${pageLabel} — ${productLabel}`;
        }
        return productLabel;
    }

    if (parsed.hostname === 'aws.amazon.com') {
        const product = segments[0];
        if (!product || product === 'free' || product === 'what-is') {
            return humanize(product ?? parsed.hostname);
        }
        return TITLES[product] ?? humanize(product);
    }

    return humanize(segments[segments.length - 1]);
}

/** Host portion of a URL, without the leading "www.". */
export function sourceHost(url) {
    if (typeof url !== 'string' || url.length === 0) return null;
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return null;
    }
}

/**
 * Convenience pair for rendering: a readable title plus the host, always
 * falling back to the raw URL when parsing fails so no link is ever
 * rendered without a label.
 */
export function describeSource(url) {
    return {
        url,
        title: sourceLabel(url) ?? url,
        host: sourceHost(url) ?? url,
    };
}
