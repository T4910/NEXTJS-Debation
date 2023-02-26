'use client'
import Footer from './(componets)/Footer';
import { SessionProvider } from 'next-auth/react';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{margin: '0px'}}>
        <SessionProvider>
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}