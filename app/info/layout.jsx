import Navbar from '../(componets)/Navbar';

export default function InfoLayout({ children }) {
    return (
      <>
        <Navbar />
        <div>{children}</div>
      </>
    )
  }
  