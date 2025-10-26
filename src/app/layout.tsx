import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './css/style.css'
import './css/euclid-circular-a-font.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Tushar Automobiles - Premium Auto Parts',
  description: 'Your trusted source for high-quality automobile parts and accessories',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="icon"
          href="/images/logo.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
