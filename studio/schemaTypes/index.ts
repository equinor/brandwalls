import { settings } from './singletons/settings'

import location from './documents/location'
import slideshow from './documents/slideshow'
import slide from './documents/slide'

import infoBoard from './objects/infoBoard'
import fullWidthImage from './objects/fullWidthImage'
import fullWidthVideo from './objects/fullWidthVideo'
import textBlock from './objects/textBlock'
import slideScheduling from './objects/slideScheduling'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  location,
  slideshow,
  slide,
  // Objects
  textBlock,
  infoBoard,
  fullWidthImage,
  fullWidthVideo,
  slideScheduling,
]
