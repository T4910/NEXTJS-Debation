import Navbar from '../(componets)/Navbar';


export default function SigningsLayout({ children }) {
  return (
    <>
      <Navbar />
      <div
          style={{
              backgroundColor: '#50a0de',
              padding: '10px'
          }}
      >
          {children}
      </div>
    </>
  )
}
