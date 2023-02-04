import DashboardNavBar from '../(componets)/DashboardNavBar'

export default function DashboardLayout({ children }) {
    return (
      <>
        <DashboardNavBar /> 
        <div>{children}</div>
      </>
    )
  }
  