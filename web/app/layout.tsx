import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'
import * as demo from '@/sanity/lib/demo'
import { toPlainText, VisualEditing } from 'next-sanity'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import { handleError } from './client-utils'
import DraftModeToast from '@/components/draft-mode/DraftModeToast'

/* export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}
 */

const equinorRegular = localFont({
  src: './fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: './fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: './fonts/equinor/EquinorVariable-VF.woff2',
})

export const metadata: Metadata = {
  title: 'Equinor Brandwalls',
  robots: 'noindex, nofollow',
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html
      lang="en"
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <body>
        {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /components/DraftModeToast.tsx */}
        {/*           <Toaster /> */}
        {/*           {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )} */}
        {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
        {/*           <SanityLive onError={handleError} /> */}
        <main className="relative h-screen w-screen">{children}</main>
      </body>
    </html>
  )
}
