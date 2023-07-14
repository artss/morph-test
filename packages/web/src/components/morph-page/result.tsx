import { ResultImagesProps } from './types';
import {
  ResultImagesRoot,
  ResultTitle,
  ResultImagesS,
  ResultImage,
} from './index.styled';

export function ResultImages({ title, images }: ResultImagesProps) {
  return (
    <ResultImagesRoot>
      <ResultTitle>{title}</ResultTitle>

      <ResultImagesS>
        {images.map((url) => (
          <ResultImage key={url} src={url} alt="" />
        ))}
      </ResultImagesS>
    </ResultImagesRoot>
  );
}
