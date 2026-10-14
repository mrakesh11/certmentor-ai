import { describe, it, expect } from 'vitest';
import { sourceLabel, sourceHost, describeSource } from '../sources';

describe('sourceLabel', () => {
    it('derives a page title plus product from a docs.aws.amazon.com URL', () => {
        expect(sourceLabel('https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html')).toBe(
            'ID Roles — IAM',
        );
    });

    it('uses the product title when the product has a known short name', () => {
        expect(sourceLabel('https://docs.aws.amazon.com/s3/latest/userguide/Welcome.html')).toBe(
            'Welcome — Amazon S3',
        );
    });

    it('humanises a camelCase product slug such as AmazonS3', () => {
        expect(sourceLabel('https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html')).toBe(
            'Welcome — Amazon S3',
        );
    });

    it('preserves AWS initialisms in page slugs', () => {
        expect(sourceLabel('https://docs.aws.amazon.com/vpc/latest/userguide/vpc-different-peering.html'))
            .toContain('VPC Different Peering');
    });

    it('reads a bare aws.amazon.com product path', () => {
        expect(sourceLabel('https://aws.amazon.com/lambda/')).toBe('AWS Lambda');
    });

    it('falls back to the host when the path is empty', () => {
        expect(sourceLabel('https://docs.aws.amazon.com/')).toBe('docs.aws.amazon.com');
    });

    it('returns null for a non-string input', () => {
        expect(sourceLabel(null)).toBeNull();
        expect(sourceLabel(undefined)).toBeNull();
        expect(sourceLabel(42)).toBeNull();
    });

    it('returns null for a string that is not a URL', () => {
        expect(sourceLabel('not a url')).toBeNull();
        expect(sourceLabel('')).toBeNull();
    });

    it('returns null rather than throwing on malformed input', () => {
        expect(() => sourceLabel('http://')).not.toThrow();
    });

    it('handles a non-AWS host by naming the last path segment', () => {
        expect(sourceLabel('https://example.com/some/page-name')).toBe('Page Name');
    });
});

describe('sourceHost', () => {
    it('strips the leading www', () => {
        expect(sourceHost('https://www.aws.amazon.com/ec2/')).toBe('aws.amazon.com');
    });

    it('keeps the docs subdomain intact', () => {
        expect(sourceHost('https://docs.aws.amazon.com/s3/latest/userguide/Welcome.html'))
            .toBe('docs.aws.amazon.com');
    });

    it('returns null for unusable input', () => {
        expect(sourceHost(null)).toBeNull();
        expect(sourceHost('nope')).toBeNull();
    });
});

describe('describeSource', () => {
    it('pairs a readable title with the host', () => {
        const result = describeSource('https://aws.amazon.com/lambda/');
        expect(result).toEqual({
            url: 'https://aws.amazon.com/lambda/',
            title: 'AWS Lambda',
            host: 'aws.amazon.com',
        });
    });

    it('always yields a non-empty title, falling back to the raw URL', () => {
        const raw = 'definitely-not-a-url';
        const result = describeSource(raw);
        expect(result.title).toBe(raw);
        expect(result.host).toBe(raw);
    });

    it('never returns an empty title for a valid URL with no path', () => {
        expect(describeSource('https://aws.amazon.com/').title).not.toBe('');
    });

    it('preserves the exact original URL for the href', () => {
        const url = 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html';
        expect(describeSource(url).url).toBe(url);
    });
});
