import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '../..');

const paths = {
    verificationReport: path.join(scriptDirectory, 'factual-verification-report.json'),
    output: path.join(projectDirectory, 'frontend', 'src', 'data', 'question-domains.json'),
};

/**
 * Read-only derivation for the learning app.
 *
 * Input (never modified here):
 *   - factual-verification-report.json  (each item carries its official
 *     CLF-C02 domain, assigned by the report's task-statement rule)
 *
 * Output:
 *   - frontend/src/data/question-domains.json
 *     `{ "<questionId>": <officialDomainNumber>, ... }` for all 495 questions.
 *
 * Why this exists: the exam simulator records which of the full question bank
 * a learner got wrong. Grouping those misses by the *official* domain gives an
 * honest "missed questions by domain" view. The previous UI inferred domains
 * from keyword matching and displayed a derived "mastery %" that no source
 * supports; this replaces it with counts that can be traced back to the
 * report. Nothing here marks a question verified or changes any answer.
 */

async function main() {
    const report = JSON.parse(await fs.readFile(paths.verificationReport, 'utf8'));

    if (!Array.isArray(report.items) || report.items.length === 0) {
        throw new Error('factual-verification-report.json has no items array');
    }

    const domainById = {};
    const unassigned = [];

    for (const item of report.items) {
        const number = item?.officialDomain?.number;
        if (Number.isInteger(number)) {
            domainById[item.id] = number;
        } else {
            unassigned.push(item.id);
        }
    }

    // Every question must resolve to one of the four official domains before
    // the map is written; otherwise the UI would silently drop misses.
    if (unassigned.length > 0) {
        throw new Error(`${unassigned.length} questions have no official domain: ${unassigned.join(', ')}`);
    }

    const sorted = Object.fromEntries(
        Object.entries(domainById).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })),
    );

    await fs.writeFile(paths.output, `${JSON.stringify(sorted, null, 0)}\n`, 'utf8');

    const counts = {};
    for (const number of Object.values(domainById)) counts[number] = (counts[number] ?? 0) + 1;

    console.log(`Wrote ${paths.output}`);
    console.log(`  ${Object.keys(domainById).length} questions mapped`);
    for (const number of Object.keys(counts).sort()) {
        console.log(`  domain ${number}: ${counts[number]}`);
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
});
