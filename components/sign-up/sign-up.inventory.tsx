import { InputProps } from '@nextui-org/react';

export const inputStyles = ({ error }: { error?: string }) => {
  const initialValue: Partial<InputProps> = {
    clearable: true,
    status: error ? 'error' : 'default',
    helperText: error ? error : '',
    underlined: true,
  };

  return {
    ...initialValue,
  };
};
