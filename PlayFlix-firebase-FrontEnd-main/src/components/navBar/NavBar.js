import { logout } from "../helpers/logout";
import "./NavBar.css"

export const NavBar = ({navigate, setUserState, setUserCheck, userCheck, userState}) => {
    
    const onLogout = () => {
        logout.logout(navigate, setUserCheck, setUserState, userCheck, userState);
      };
    return (
        <>
            <ul>

                    
                    <li className="">
                        <div className="logout">

                        <button onClick={() => {onLogout()}}>Logout</button>
                        </div>
                    </li>
                    

                
            </ul>
        </>
    )
}