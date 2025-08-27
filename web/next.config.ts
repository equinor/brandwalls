import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    //@ts-ignore: TODO check why types does not find this property
    clientInstrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components
    // to use the fastest way of inserting CSS rules in both dev and production.
    // It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
}

export default withSentryConfig(nextConfig, {
  org: 'equinor',
  project: 'brandwalls',
  silent: !process.env.CI,
  disableLogger: true,
})
