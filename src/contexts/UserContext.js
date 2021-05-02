import { createContext, useEffect, useState } from 'react';

const prefixPath = "/api/v1";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [favorites, setFavorites] = useState(null);

    useEffect(() => {
        whoami();
    }, []);


    // User

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
        setFavorites(null);
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

    const edit = async (userId, newUser) => {
        let result = await fetch(`${prefixPath}/users/edit/${userId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        result = await result.json();
        return result;
    };


    // Favorites

    const getUserFavoritesById = async (userId) => {
        let favorites = await fetch(`${prefixPath}/users/favorites/${userId}`);
        favorites = await favorites.json();
        setFavorites(favorites);
    };

    const addFavoriteToDB = async (favorite) => {
        let result = await fetch(`${prefixPath}/users/favorites`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favorite)
        });
        result = await result.json();
        return result;
    };

    const addFavoriteToId = async (userId, favoriteName) => {
        let result = await fetch(`${prefixPath}/users/favorites/${userId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favoriteName)
        });
        result = await result.json();
        return result;
    };

    const removeFavoriteFromId = async (userId, favoriteId) => {
        let result = await fetch(`${prefixPath}/users/favorites/${userId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favoriteId)
        });
        result = result.json();
        return result;
    };

    const values = {
        loggedInUser,
        favorites,
        whoami,
        login,
        logout,
        register,
        edit,
        getUserFavoritesById,
        addFavoriteToDB,
        addFavoriteToId,
        removeFavoriteFromId
    };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;