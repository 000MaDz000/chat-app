import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'madz chat app',
  description: 'a basic chat app',
}

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
