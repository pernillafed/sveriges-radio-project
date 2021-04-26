import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/Login.module.css';

function Login() {

    const { login } = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        } else {
            console.log(result);
        }
    };

    return (
        <div className="container">
            <h2>Logga in</h2>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                    <input type="email" placeholder="email" onChange={handleEmailChange} required />
                    <input type="password" placeholder="lösenord" onChange={handlePasswordChange} required />
                </div>
                <button className={styles.formBtn}>Logga in</button>
            </form>
            <div className={styles.switchRouteLink}>
                <Link to="/users/register" >Inte medlem? Registrera dig!</Link>
            </div>
        </div>
    );
}

export default Login;