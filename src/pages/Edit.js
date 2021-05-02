import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegisterEditForm from "../components/RegisterEditForm";
import RegisterPopup from "../components/RegisterPopup";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/MyPage.module.css';

function Edit() {

    const { loggedInUser, edit } = useContext(UserContext);

    const [showPopup, setShowPopup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            firstName,
            lastName,
            email,
            password
        };
        let result = await edit(loggedInUser.userId, newUser);
        if (result.success) {
            setShowPopup(true);
        } else {
            setError("Denna email används redan");
        }
    };

    return (
        <div className="container">
            {loggedInUser ? (
                <RegisterEditForm
                    title={"Ändra uppgifter"}
                    btnText={"Spara"}
                    handleFirstNameChange={handleFirstNameChange}
                    handleLastNameChange={handleLastNameChange}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    handleSubmit={handleSubmit}
                    error={error}
                />
            ) : (
                <div className={styles.loggedOutWrapper}>
                    <h2>Du måste vara inloggad för att kunna nå denna sida!</h2>
                    <Link to="/users/login" className={styles.loginLink}>Logga in</Link>
                    <Link to="/users/register" className={styles.registerLink}>Inte medlem? Registrera dig!</Link>
                </div>
            )}
            {showPopup && (
                <RegisterPopup setShowPopup={setShowPopup} msg={"Dina nya uppgifter är sparade!"} route={"/users/whoami"} linkText={"Till min sida"} />
            )}
        </div>
    );
}

export default Edit;