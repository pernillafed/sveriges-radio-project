import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import RegisterPopup from '../components/RegisterPopup';
import RegisterEditForm from '../components/RegisterEditForm';

import styles from '../css/Login.module.css';

function Register() {

    const { loggedInUser, logout, register } = useContext(UserContext);

    const [showPopup, setShowPopup] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container">
            {!loggedInUser ? (
                <div>
                    <RegisterEditForm
                        formFunction={register}
                        setShowPopup={setShowPopup}
                        errorMsg={"Användare med denna email finns redan"}
                        title={"Registrera"}
                        btnText={"Registrera"}
                        loggedInUser={null}
                    />
                    <div className={styles.switchRouteLink}>
                        <Link to="/users/login">Redan medlem? Logga in!</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className={styles.logoutHeading}>Du måste logga ut för att kunna registrera ny användare!</h2>
                    <Link onClick={handleLogout} to="/users/register" className={styles.toLogin}>Logga ut</Link>
                </div>
            )}
            {showPopup && (
                <RegisterPopup setShowPopup={setShowPopup} msg={"Du är nu registrerad!"} route={"/users/login"} linkText={"Logga in"} />
            )}
        </div>
    );
}

export default Register;