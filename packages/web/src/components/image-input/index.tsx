import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  imageTypes,
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_SIZE,
  MAX_IMAGE_WIDTH,
} from '@/constants/upload';
import { ImageUploadProps } from './types';
import {
  FileDescription,
  FileError,
  FileInput,
  FileReset,
  ImagePlaceholder,
  ImagePlaceholderText,
  ImageS,
  ImageUploadForm,
} from './index.styled';

const imageMimeTypes = Object.keys(imageTypes);

export function ImageInput({
  name = 'image',
  onChange,
  error,
  className,
}: ImageUploadProps) {
  const imageFormRef = useRef<HTMLFormElement | null>(null);

  // Way to reset input
  const [inputKey, setInputKey] = useState(0);
  const resetInput = useCallback(() => setInputKey((key) => key + 1), []);

  const [previewImage, setPreviewImage] = useState<string>();
  const [fileError, setFileError] = useState<string>();

  const setError = (message: string) => {
    onChange?.(undefined);
    resetInput();
    setPreviewImage(undefined);
    setFileError(message);
  };

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const reset = useCallback(() => {
    resetInput();
    setPreviewImage(undefined);
    setFileError(undefined);
    onChangeRef.current?.(undefined);
  }, [resetInput]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] ?? undefined;

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File exceeds ${Math.round(MAX_IMAGE_SIZE / 1024)}kb`);
      return;
    }

    if (!imageMimeTypes.includes(file.type)) {
      setError('Invalid image format');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const dataUrl = e.target?.result ? String(e.target.result) : undefined;

      if (!dataUrl) {
        setError('Unknown error');
        return;
      }

      const img = new Image();
      img.src = dataUrl;

      img.onload = async () => {
        if (img.width > MAX_IMAGE_WIDTH || img.height > MAX_IMAGE_HEIGHT) {
          setError(`Image is out of ${MAX_IMAGE_WIDTH}x${MAX_IMAGE_HEIGHT}`);
          return;
        }

        onChange?.(dataUrl);
        setPreviewImage(dataUrl);
        setFileError(undefined);
      };
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      setError(e.target?.error?.message || 'Unknown error');
    };
  };

  const currentError = fileError || error;

  return (
    <ImageUploadForm
      className={className}
      ref={imageFormRef}
      onSubmit={(e) => e.preventDefault()}
    >
      {previewImage ? (
        <ImageS src={previewImage} alt="" />
      ) : (
        <ImagePlaceholder>
          <ImagePlaceholderText>
            drop file here
            <br />
            or click to choose
          </ImagePlaceholderText>

          <FileDescription>
            Image should be at most {MAX_IMAGE_WIDTH}x{MAX_IMAGE_HEIGHT} and{' '}
            {Math.round(MAX_IMAGE_SIZE / 1024)}kb
          </FileDescription>
        </ImagePlaceholder>
      )}

      <FileInput key={inputKey} name={name} onChange={onFileChange} />

      {currentError && <FileError>{currentError}</FileError>}

      {previewImage && <FileReset onClick={reset}>Reset</FileReset>}
    </ImageUploadForm>
  );
}
