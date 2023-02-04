import Footer from './(componets)/Footer';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{margin: '0px'}}>
        {children}
        <Footer />
      </body>
    </html>
  );
}