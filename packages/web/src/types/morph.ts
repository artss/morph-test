export enum MorphStatus {
  Pending = 'pending',
  Started = 'started',
  Failed = 'failed',
  Finished = 'finished',
  Canceled = 'canceled',
  NotFound = 'not found',
}

export type MorphResult = {
  result: string[];
  other: string[];
};
