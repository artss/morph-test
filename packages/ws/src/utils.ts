import { readFile } from 'fs';
import { promisify } from 'util';

export function uniqid(): string {
  return [Date.now() + Math.random()].join('');
}

const readFileAsync = promisify(readFile);

export async function readFileToBase64(path: string): Promise<string> {
  const data = await readFileAsync(path);
  const b64 = data.toString('base64');
  return `data:image/png;base64,${b64}`;
}

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  shuffled.sort(() => 0.5 - Math.random());
  return shuffled;
}
