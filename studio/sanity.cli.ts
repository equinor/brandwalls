import {defineCliConfig} from 'sanity/cli'

const dataset = process.env.SANITY_STUDIO_DATASET || 'development'

export default defineCliConfig({
  api: {
    projectId: 'l3891ift',
    dataset,
  },
  studioHost: 'brandwall',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
