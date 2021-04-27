import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../contexts/UserContext";

function Whoami() {

    const { loggedInUser, logout } = useContext(UserContext);
    const history = useHistory();

    const handleClick = () => {
        logout();
        history.push("/");
    };

    return (
        <div className="container">
            {loggedInUser ? (
                <div className="wrapper">
                    <h2>Hej {loggedInUser.firstName}!</h2>
                    <p>{loggedInUser.email}</p>
                    <button onClick={handleClick}>Logga ut</button>
                </div>
            ) : (
                <h2>No user</h2>
            )}
        </div>
    );
}

export default Whoami;