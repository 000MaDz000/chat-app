import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'madz chat app',
  description: 'a basic chat app',
}

type RootProps = {
  children: React.ReactNode
  auth: React.ReactNode,
  params: { [key: string]: string };
};


export default function RootLayout(props: RootProps) {
  const { children, auth } = props;

  return (
    <html lang="en">
      <body>
        {children}
        {auth}
      </body>
    </html>
  )
}
