export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-')

  return `${month}/${day}/${year}`
}

export const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':')

  return hour > 12 ? `${hour - 12}:${minute}pm` : `${hour}:{minute}am`
}
