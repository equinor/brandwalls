import { createAuthStore, defineConfig, PluginOptions } from 'sanity'
import { media } from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { DatabaseIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './deskstructure'
import { defineDocuments, defineLocations, DocumentLocation, presentationTool } from 'sanity/presentation'
import { dataset, projectId } from './sanity.cli'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return slug ? `/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

const getStudioTitle = (dataset: string) => {
  switch (dataset) {
    case 'development':
      return 'Development'
    default:
      return 'Production'
  }
}

const getConfig = (datasetParam: string, projectIdParam: string, isSecret = false) => ({
  name: 'brandwall-' + datasetParam,
  title: 'Studio [' + getStudioTitle(datasetParam) + ']',
  icon: DatabaseIcon,
  basePath: '/' + datasetParam,
  projectId: projectIdParam,
  dataset: datasetParam,
  //theme: customTheme,
  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure,
    }),
    media(),
    datasetParam === 'development' && visionTool(),
    //FotowareAssetSource(),
    //BrandmasterAssetSource(),
  ].filter((e) => e) as PluginOptions[],
  schema: {
    types: schemaTypes,
  },
  document: {},
  auth: createAuthStore({
    projectId: projectIdParam,
    dataset: datasetParam,
    mode: 'replace',
    redirectOnSingle: true,
    providers: [
      {
        name: 'saml',
        title: 'Equinor SSO',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/55ba173c',
        logo: '/static/favicon.ico',
      },
    ],
  }),
})

export default getConfig(dataset, projectId)

/* export default defineConfig({
  name: 'default',
  title: 'Brand wall',
  projectId: 'l3891ift',
  dataset: 'development',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },

}) */
