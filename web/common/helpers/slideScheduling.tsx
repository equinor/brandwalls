type Slide = {
  content: any
  duration?: number | null
  scheduling?: any
}

export function isSlideActive(slide: any): boolean {
  const scheduling = slide?.scheduling
  if (!scheduling) return true

  switch (scheduling.scheduleType) {
    case '1': {
      // Specific period
      const nowDateTime = new Date().getTime()
      const from = scheduling.period?.from ? new Date(scheduling.period.from).getTime() : null
      const to = scheduling.period?.to ? new Date(scheduling.period.to).getTime() : null
      if (from && to) {
        return nowDateTime >= from && nowDateTime <= to
      }
      if (from && !to) {
        return nowDateTime >= from
      }
      if (!from && to) {
        return nowDateTime <= to
      }
      return false
    }

    case '2': {
      // Selected weekdays
      const now = new Date()
      const today = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase()
      return scheduling.weekdays?.includes(today) || false
    }
    case '0':
    default:
      return true
  }
}

export function distributeRecurringForSlideshow(slides: Slide[]): Slide[] {
  const recurringSlides = slides.filter((slide) => slide?.scheduling?.scheduleType === '3')
  const otherSlides = slides.filter((slide) => slide?.scheduling?.scheduleType !== '3')

  // Insert recurring slides into otherSlides
  recurringSlides.forEach((slide) => {
    const frequency = slide.scheduling?.slideFrequency ? parseInt(slide.scheduling?.slideFrequency, 10) : 3
    for (let i = frequency - 1; i < otherSlides.length; i += frequency) {
      otherSlides.splice(i, 0, slide)
    }
  })
  return otherSlides
}
