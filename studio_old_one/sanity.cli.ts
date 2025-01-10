import { defineCliConfig } from 'sanity/cli'

export const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID || 'l3891ift'
export const dataset = process.env.SANITY_STUDIO_API_DATASET || 'development'
export const apiVersion = 'v2025-01-07'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // Visit https://www.sanity.io/docs/environment-variables to leanr more about using environment variables for local & production.
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
