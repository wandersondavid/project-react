

export const fotmatDate = (date: string) => {
  if(!date) return ''

  const dateFormatted = new Date(date)
  const day = dateFormatted.getDate()
  const month = dateFormatted.getMonth() + 1
  const year = dateFormatted.getFullYear()

  return `${day}/${month}/${year}`
}