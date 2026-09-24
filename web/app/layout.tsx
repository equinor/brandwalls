import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { draftMode } from 'next/headers';
import { Toaster } from 'sonner';
import DraftModeToast from '@/components/draft-mode/DraftModeToast';
import { SanityLive } from '@/sanity/lib/live';
import { ConditionalVisualEditing } from './ConditionalVisualEditing';

const equinorRegular = localFont({
  src: './fonts/equinor/Equinor-Regular.woff',
});
const equinorVariableWoff = localFont({
  src: './fonts/equinor/EquinorVariable-VF.woff',
});
const equinorVariableWoff2 = localFont({
  src: './fonts/equinor/EquinorVariable-VF.woff2',
});

export const metadata: Metadata = {
  title: 'Equinor Brandwalls',
  robots: 'noindex, nofollow',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html
      lang="en"
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <body>
        {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /components/DraftModeToast.tsx */}
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <ConditionalVisualEditing />
          </>
        )}
        <SanityLive />
        <main className="relative h-screen max-h-[100vh] w-screen max-w-[100vw]">
          {children}
        </main>
      </body>
    </html>
  );
}
