import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://taxraj.com'),
  verification: {
    google: 'x5kkPOLcK7f6G_M4HfEDdWoG--6n8AQwfpiGht-sGes'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
