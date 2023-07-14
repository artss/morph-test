import { resolve } from 'path';
import { MAX_TIMEOUT, MIN_TIMEOUT, ERROR_CHANCE } from './constants';
import { IMorph, MorphErrorCallback, MorphResultCallback } from './types';
import { readFileToBase64, shuffle, uniqid } from './utils';

async function readFiles(names: string[]) {
  return Promise.all(
    names.map((name) => readFileToBase64(resolve(__dirname, name)))
  );
}

const resultFileNames = [
  './assets/o1.png',
  './assets/o2.png',
  './assets/o3.png',
];

const otherFileNames = [
  './assets/other1.png',
  './assets/other2.png',
  './assets/other3.png',
];

export class Morph implements IMorph {
  private readonly timeout: ReturnType<typeof setTimeout>;

  public readonly id: string;

  constructor(
    images: string[],
    onResult: MorphResultCallback,
    onError: MorphErrorCallback
  ) {
    this.id = uniqid();

    this.timeout = setTimeout(async () => {
      if (Math.random() <= ERROR_CHANCE) {
        onError(`Something went wrong with ${ERROR_CHANCE * 100} chance`);
        return;
      }

      const result = await readFiles(resultFileNames);
      const other = await readFiles(otherFileNames);

      onResult({ result: shuffle(result), other: shuffle(other) });
    }, MIN_TIMEOUT + Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT));
  }

  cancel() {
    clearTimeout(this.timeout);
  }
}
