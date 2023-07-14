import { useMemo, useState } from 'react';
import { ImageInput } from '@/components/image-input';
import { Button } from '@/components/button';
import { MorphFormProps } from './types';
import { MorphFormRoot, Images, Buttons } from './index.styled';

const validateImages = (images: (string | undefined)[]) =>
  images.every((img) => !!img);

export function MorphForm({
  images: imageCount,
  disabled,
  onSubmit,
  showCancel,
  onCancel,
  showReset,
  onReset,
}: MorphFormProps) {
  const [images, setImages] = useState<(string | undefined)[]>([]);

  const isValid = useMemo(
    () => images.length === imageCount && validateImages(images),
    [images, imageCount]
  );

  const onChange = (file: string | undefined, index: number) =>
    setImages((prevState) => {
      const newState = [...prevState];
      newState[index] = file;
      return newState;
    });

  const submit = () => {
    if (!validateImages(images)) return;
    onSubmit(images as string[]);
  };

  return (
    <MorphFormRoot>
      <Images>
        {new Array(imageCount).fill(null).map((_, index) => (
          <ImageInput key={index} onChange={(file) => onChange(file, index)} />
        ))}
      </Images>

      <Buttons>
        <Button disabled={disabled || !isValid} onClick={submit}>
          morph
        </Button>

        {showCancel && <Button onClick={onCancel}>cancel</Button>}

        {showReset && <Button onClick={onReset}>reset</Button>}
      </Buttons>
    </MorphFormRoot>
  );
}
