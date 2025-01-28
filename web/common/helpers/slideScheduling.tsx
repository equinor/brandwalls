type Slide = {
  content: any
  duration?: number | null
  scheduling?: any
}

function isSlideActive(slide: any): boolean {
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

    default:
      return true
  }
}

// Function to process slides based on scheduleType
export function processSlides(slides: Slide[]): Slide[] {
  const activeSlides: Slide[] = []
  const recurringSlides: Slide[] = []

  // Separate slides with scheduleType 3 (frequency-based)
  slides.forEach((slide) => {
    const scheduleType = slide.scheduling?.scheduleType
    if (scheduleType === '3') {
      recurringSlides.push(slide)
    } else if (isSlideActive(slide)) {
      activeSlides.push(slide)
    }
  })

  // Insert recurring slides into activeSlides
  recurringSlides.forEach((slide) => {
    const frequencies = slide.scheduling?.slideFrequency?.map(Number) || []
    frequencies.forEach((freq: number) => {
      for (let i = freq - 1; i < activeSlides.length; i += freq) {
        activeSlides.splice(i, 0, slide)
      }
    })
  })

  return activeSlides
}

export default processSlides
