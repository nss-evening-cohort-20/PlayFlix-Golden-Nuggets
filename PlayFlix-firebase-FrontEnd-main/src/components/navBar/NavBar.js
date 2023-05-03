import { Link, useNavigate } from "react-router-dom"
import { logout } from "../helpers/logout";

export const NavBar = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        logout.logout(navigate("/login"));
      };
    return (
        <>
            <ul>
                
                {
                    sessionStorage.getItem("PlayFlix_user") ?
                    <li className="">
                        <button onClick={() => {onLogout()}}>Logout</button>
                    </li>
                    : ""
                }
                
            </ul>
        </>
    )
}