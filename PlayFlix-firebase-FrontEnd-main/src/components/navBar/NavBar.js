import { logout } from "../helpers/logout";

export const NavBar = ({navigate, setUserState, setUserCheck, userCheck, userState}) => {
    
    const onLogout = () => {
        logout.logout(navigate, setUserCheck, setUserState, userCheck, userState);
      };
    return (
        <>
            <ul>

                    
                    <li className="Logout">
                        <button onClick={() => {onLogout()}}>Logout</button>
                    </li>
                    

                
            </ul>
        </>
    )
}