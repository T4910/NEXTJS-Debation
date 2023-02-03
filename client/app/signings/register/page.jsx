export default function register() {
    return (
      <>
          <form action="https://localhost:5000/register">
              <input type='text' placeholder="Username"/>
              <input type='email' placeholder="Email"/>
              <input type='password' placeholder="Password"/>
              <input type="submit" value="Sign up"/>
          </form>
      </>
    )
  }
  
  register.getLayout = function getLayout(register) {
    return (
      <Layout>
        <NestedLayout>{register}</NestedLayout>
      </Layout>
    )
  }