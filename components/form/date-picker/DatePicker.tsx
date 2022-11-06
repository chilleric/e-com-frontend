import { Input, InputProps, useTheme } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { DayModal, getDayString, MonthModal, YearModal } from './inventory'

interface IDatePicker {
  value?: Date | string
  onChange: Function
  label: string
  buttonProps: Partial<InputProps>
  disable?: boolean
}

export const DatePicker = ({ value, label, onChange, buttonProps, disable }: IDatePicker) => {
  const nowDay = value ? new Date(value) : new Date()
  const [year, setYear] = useState(nowDay.getFullYear())
  const [month, setMonth] = useState(nowDay.getMonth() + 1)
  const [day, setDay] = useState(nowDay.getDate())

  const [type, setType] = useState<'day' | 'month' | 'year' | ''>('')
  const { theme } = useTheme()
  const divRef = useRef<HTMLDivElement>(null)

  const [yearRange, setYearRange] = useState(year - (year % 10))

  const handleChaneMonth = (newMonth: number) => {
    if (newMonth > 0 && newMonth < 13) {
      setMonth(newMonth)
    }
  }

  useEffect(() => {
    if (year - yearRange > 10) setYearRange(year - (year % 10))
  }, [year])

  useEffect(() => {
    if (!value) {
      onChange(getDayString(day, month, year))
    }
  }, [value])

  const obj = {
    year: (
      <YearModal
        year={year}
        yearRange={yearRange}
        setYear={setYear}
        setYearRange={setYearRange}
        setType={setType}
      />
    ),
    month: (
      <MonthModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={setType}
      />
    ),
    day: (
      <DayModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={setType}
        day={day}
        setDay={setDay}
        onChange={onChange}
      />
    ),
    '': null,
  }

  return (
    <>
      {type !== '' && (
        <div
          style={{
            position: 'fixed',
            opacity: 0,
            backgroundColor: 'transparent',
            width: '100vw',
            height: '100vh',
            inset: 0,
            zIndex: 101,
          }}
          onClick={() => {
            setType('')
          }}
        />
      )}
      <div
        onClick={() => {
          if (!disable) {
            setType('day')
          }
        }}
        ref={divRef}
        style={{ width: '100%', position: 'relative', zIndex: 101 }}
      >
        <Input
          css={{ width: '100%' }}
          value={getDayString(nowDay.getDate(), nowDay.getMonth() + 1, nowDay.getFullYear())}
          label={label}
          readOnly
          {...buttonProps}
        />
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
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
          {obj[type]}
        </div>
      </div>
    </>
  )
}
