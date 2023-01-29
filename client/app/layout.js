export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head />
        <body>
          <nav>
            <h1>Debation</h1>
            <a href="/dashboard">Home</a>
            <a href="/dashboard/profile">Profile</a>
            <a href="/logout">Logout</a>
          </nav>
          {children}
        </body>
      </html>
    );
  }