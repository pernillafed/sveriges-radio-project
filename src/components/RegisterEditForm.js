import styles from '../css/Login.module.css';

function RegisterEditForm({ title, btnText, handleFirstNameChange, handleLastNameChange, handleEmailChange, handlePasswordChange, handleSubmit, error }) {

    return (
        <div>
            <h2>{title}</h2>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                    <input type="text" placeholder="förnamn" onChange={handleFirstNameChange} required />
                    <input type="text" placeholder="efternamn" onChange={handleLastNameChange} required />
                    <input type="email" placeholder="email" onChange={handleEmailChange} required />
                    <input type="password" placeholder="lösenord" onChange={handlePasswordChange} required />
                </div>
                {error && <p>{error}</p>}
                <button className={styles.formBtn}>{btnText}</button>
            </form>
        </div>
    );
}

export default RegisterEditForm;