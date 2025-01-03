import type {Metadata} from 'next'
import './globals.css'
import {Toaster} from 'sonner'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import * as demo from '@/sanity/lib/demo'
import {toPlainText, VisualEditing} from 'next-sanity'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {handleError} from './client-utils'
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

export const metadata: Metadata = {
  title: 'Equinor Brandwalls',
  robots: 'noindex, nofollow',
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en">
      <body>
        <section>
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
          <main className="">{children}</main>
        </section>
      </body>
    </html>
  )
}
