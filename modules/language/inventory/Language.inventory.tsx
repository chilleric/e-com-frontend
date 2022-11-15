import { InputProps } from '@nextui-org/react'

export const inputStylesLanguage = ({ error }: { error?: string }) => {
  const initialValue: Partial<InputProps> = {
    status: error ? 'error' : 'default',
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}
