const LoginStatus = ({ user, handleLogout }) => (
  <div>
    {user.name} logged in
    <button onClick={handleLogout}>
      Log out
    </button>
  </div>
)

export default LoginStatus