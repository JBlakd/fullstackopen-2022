import Notification from './Notification'

const Login = ({ username, setUsername, password, setPassword, handleLogin, notification }) => {
  // console.log("Login notification: ", notification)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login