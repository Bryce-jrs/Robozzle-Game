import { readFileSync } from 'fs';

/**
 * Gets file data with 'filename' as name.
 * @param filename string 
 * @returns string
 */
export function readJsonFile(filename: string): string {
    try {
        return readFileSync(filename, 'utf8');
    } catch (err) {
        throw new Error('File reading error.');
    }
}
