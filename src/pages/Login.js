import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/Login.module.css';

function Login() {

    const { loggedInUser, login, logout } = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            email,
            password
        };
        let result = await login(user);
        if (result.success) {
            history.push("/");
        } else if (result.error) {
            setError("Fel email eller lösenord");
        };
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container">
            {!loggedInUser ? (
                <div>
                    <h2>Logga in</h2>
                    <form className={styles.inputForm} onSubmit={handleSubmit}>
                        <div className={styles.inputFields}>
                            <input type="email" placeholder="email" onChange={handleEmailChange} required />
                            <input type="password" placeholder="lösenord" onChange={handlePasswordChange} required />
                        </div>
                        {error && <p>{error}</p>}
                        <button className={styles.formBtn}>Logga in</button>
                    </form>
                    <div className={styles.switchRouteLink}>
                        <Link to="/users/register">Inte medlem? Registrera dig!</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className={styles.logoutHeading}>Du måste logga ut för att kunna logga in på nytt!</h2>
                    <Link onClick={handleLogout} to="/users/login" className={styles.toLogin}>Logga ut</Link>
                </div>
            )}
        </div>
    );
}

export default Login;