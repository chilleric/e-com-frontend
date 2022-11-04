import { Input, InputProps, useTheme } from '@nextui-org/react'
import { useRef, useState } from 'react'

interface ISelectCustom {
  value: string | number
  onChange: Function
  label?: string
  disabled?: boolean
  buttonProps: Partial<InputProps>
  options: { value: string | number; label: string }[]
}

export const SelectCustom = ({
  value,
  onChange,
  label,
  disabled,
  options,
  buttonProps,
}: ISelectCustom) => {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()
  const divRef = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<string | number>('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getColor = (item: { value: string | number; label: string }) => {
    if (value === item.value) {
      return theme?.colors.blue400.value
    }
    if (hoverItem === item.value) {
      return theme?.colors.blue200.value
    }
    return ''
  }

  return (
    <div ref={divRef} style={{ width: '100%', position: 'relative' }}>
      <Input
        css={{ width: '100%' }}
        value={options.find((item) => item.value === value)?.label}
        label={label}
        readOnly
        onFocus={handleOpen}
        onBlur={handleClose}
        {...buttonProps}
      />
      {!disabled && open && (
        <div
          style={{
            position: 'absolute',
            top: divRef?.current?.clientHeight,
            left: 0,
            width: 375,
            backgroundColor: theme?.colors.accents2.value,
            boxShadow: theme?.shadows.lg.value,
            zIndex: 101,
            borderRadius: 10,
          }}
        >
          {options.map((item) => (
            <div
              style={{
                width: '100',
                height: 40,
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: getColor(item),
              }}
              onMouseMove={() => setHoverItem(item.value)}
              onMouseOut={() => setHoverItem('')}
              onMouseDown={() => {
                onChange(item.value)
              }}
              onBlur={() => {}}
              key={item.value}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
