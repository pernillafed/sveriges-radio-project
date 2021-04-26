import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Whoami() {

    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="container">
            {loggedInUser ? (
                <div className="wrapper">
                    <h2>Hej {loggedInUser.firstName}!</h2>
                    <p>{loggedInUser.email}</p>
                </div>
            ) : (
                <h2>No user</h2>
            )}
        </div>
    );
}

export default Whoami;