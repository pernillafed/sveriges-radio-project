import { createContext, useEffect, useState } from 'react';

const prefixPath = "/api/v1";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        whoami();
    }, []);

    const whoami = async () => {
        let user = await fetch(`${prefixPath}/users/whoami`);
        user = await user.json();
        setLoggedInUser(user);
    };
    
    const login = async (user) => {
        let result = await fetch(`${prefixPath}/users/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        result = await result.json();
        await whoami();
        return result;
    };
    
    const logout = async () => {
        let user = await fetch(`${prefixPath}/users/logout`);
        await user.json();
        await whoami();
    }

    const register = async (user) => {
        let result = await fetch(`${prefixPath}/users/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        result = await result.json();
        return result;
    };

    const values = {
        loggedInUser,
        login,
        logout,
        register
    }

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;