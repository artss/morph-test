import { Socket } from 'socket.io';

export type MorphResult = {
  result: string[];
  other: string[];
};

export type MorphResultCallback = (result: MorphResult) => void;

export type MorphErrorCallback = (error: string) => void;

export interface IMorph {
  readonly id: string;
  cancel(): void;
}

export enum MorphStatus {
  Pending = 'pending',
  Started = 'started',
  Failed = 'failed',
  Finished = 'finished',
  Canceled = 'canceled',
  NotFound = 'not found',
}

export interface MorphObject {
  sockets: Socket[];
  status: MorphStatus;
  morph: IMorph;
  result?: MorphResult;
  error?: string;
}
