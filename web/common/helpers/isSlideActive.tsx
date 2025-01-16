export function isSlideActive(slide: any): boolean {
  const scheduling = slide.scheduling
  if (!scheduling) return true

  const now = new Date()

  switch (scheduling.scheduleType) {
    case '1': {
      // Specific period
      const from = scheduling.period?.from ? new Date(scheduling.period.from) : null
      const to = scheduling.period?.to ? new Date(scheduling.period.to) : null
      if (from && now < from) return false
      if (to && now > to) return false
      return true
    }

    case '2': {
      // Selected weekdays
      const today = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase()
      return scheduling.weekdays?.includes(today) || false
    }

    case '3': {
      // Slide frequency
      const dayOfMonth = now.getDate()
      return (
        scheduling.slideFrequency?.some((freq: string) => {
          const freqNum = parseInt(freq, 10)
          // Basic example: "every Xth day" means dayOfMonth % X == 0
          return dayOfMonth % freqNum === 0
        }) || false
      )
    }

    default:
      return true
  }
}

export default isSlideActive
