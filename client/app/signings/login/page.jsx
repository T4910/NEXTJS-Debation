// import Layout from '../components/layout'
// import NestedLayout from '../components/nested-layout'

export default function login() {
  return (
    <>
        <form action="https://localhost:5000/login">
            <input type='text'/>
            <input type='password'/>
        </form>
    </>
  )
}

login.getLayout = function getLayout(login) {
  return (
    <Layout>
      <NestedLayout>{login}</NestedLayout>
    </Layout>
  )
}
