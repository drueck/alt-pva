export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-')

  return `${month}/${day}/${year}`
}

export const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':')

  return hour > 12 ? `${hour - 12}:${minute}pm` : `${hour}:{minute}am`
}

export const isToday = (dateString) => {
  const [year, month, day] = dateString.split('-').map((s) => parseInt(s, 10))
  const today = new Date()
  return (
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    day === today.getDate()
  )
}
