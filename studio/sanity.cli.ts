import {defineCliConfig} from 'sanity/cli'

const dataset = process.env.SANITY_STUDIO_DATASET || 'development'

export default defineCliConfig({
  api: {
    projectId: 'l3891ift',
    dataset,
  },
  studioHost: 'brandwall',
  autoUpdates: false,
})
