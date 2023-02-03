export default function login() {
  return (
    <>
        <form action="https://localhost:5000/login">
            <input type='text' placeholder="Username"/>
            <input type='password' placeholder="Password"/>
            <input type="submit" value="Login"/>
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
