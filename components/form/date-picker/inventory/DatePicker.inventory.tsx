export const getListYear = (year: number) => {
  const listYear = new Array(10).fill(null).map((value, index) => {
    return year + index
  })
  return listYear
}

export const getListMonth = () => {
  const listMonth = new Array(12).fill(null).map((value, index) => {
    return index + 1
  })
  return listMonth
}

export const getListDay = (month: number, year: number) => {
  const days = new Date(year, month, 0).getDate()

  const listDay = new Array(days).fill(null).map((value, index) => {
    return index + 1
  })

  return listDay
}

export const getDayString = (day: number, month: number, year: number) => {
  const getday = day >= 10 ? day : `0${day}`
  const getMonth = month >= 10 ? month : `0${month}`
  return `${year}-${getMonth}-${getday}`
}
