import { Divider, Text, useTheme } from '@nextui-org/react'
import { useState } from 'react'
import { getListYear } from './DatePicker.inventory'

interface IYearModal {
  year: number
  yearRange: number
  setYear: Function
  setYearRange: Function
  setType: Function
}

export const YearModal = ({ year, setYear, setYearRange, yearRange, setType }: IYearModal) => {
  const { theme } = useTheme()
  const [hoverItem, setHoverItem] = useState(-1)

  const getColor = (item: number) => {
    if (year === item) {
      return theme?.colors.blue400.value
    }
    if (hoverItem === item) {
      return theme?.colors.blue200.value
    }
    return ''
  }

  return (
    <>
      <div
        style={{
          height: 40,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Text
          css={{ cursor: 'pointer' }}
          onClick={() => {
            setYearRange(yearRange - 10)
          }}
        >
          {'<<'}
        </Text>
        <Text>
          {yearRange} - {yearRange + 9}
        </Text>
        <Text
          css={{ cursor: 'pointer' }}
          onClick={() => {
            setYearRange(yearRange + 10)
          }}
        >
          {'>>'}
        </Text>
      </div>

      <Divider />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          padding: 10,
        }}
      >
        <div />
        {getListYear(yearRange).map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item)}
            onMouseOut={() => setHoverItem(-1)}
            onMouseDown={() => {
              setYear(item)
              setType('month')
            }}
            onBlur={() => {}}
            key={item}
          >
            {item}
          </div>
        ))}
        <div />
      </div>
    </>
  )
}
