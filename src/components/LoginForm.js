import PropTypes from "prop-types"

const LoginForm = (props) => {
  return (
    <div>
        <h2>Log in to the application</h2>
      <form onSubmit={props.logUser}>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            value={props.username}
            id="Username"
            name="Username"
            onChange={(e) => props.setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={props.password}
            id="Password"
            name="Password"
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm;
