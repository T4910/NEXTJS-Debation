import DashboardNavBar from '../(componets)/DashboardComponents/DashboardNavBar'

export default function DashboardLayout({ children }) {
    return (
      <>
        <DashboardNavBar /> 
        <div>{children}</div>
      </>
    )
  }
  