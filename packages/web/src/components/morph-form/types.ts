export type MorphFormProps = {
  images: number;
  disabled?: boolean;
  onSubmit: (images: string[]) => void;
  showCancel: boolean;
  onCancel: () => void;
  showReset: boolean;
  onReset: () => void;
};
