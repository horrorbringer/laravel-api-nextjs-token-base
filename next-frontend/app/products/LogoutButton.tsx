import { logoutAction } from "../actions/auth"

const LogoutButton = () => {
  return (
    <button className="cursor-pointer" onClick={logoutAction}>Logout</button>
  )
}

export default LogoutButton