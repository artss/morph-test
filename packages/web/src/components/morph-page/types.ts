import { MorphStatus, MorphResult } from '@/types/morph';

export type OnStatusPayload = {
  status: MorphStatus;
  result?: MorphResult;
};

export type ResultImagesProps = {
  title: string;
  images: string[];
};
