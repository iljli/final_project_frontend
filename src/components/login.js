const Login = () => {
  return (
      <div className="login_container">
      <div className='login_container1'>
          <form action="POST">
          <label for="email">Email:</label>
  <input type="email" id="email" name="email" />
  <label for="password">Password:</label>
  <input type="password" id="password" name="password"  />
  <input type="submit" value="Submit" />
              </form>
 
          </div>
          </div>
  )
};

export default Login;
