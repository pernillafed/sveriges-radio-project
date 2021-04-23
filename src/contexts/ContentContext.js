import { createContext, useEffect, useState } from 'react';

export const ContentContext = createContext();

const ContentContextProvider = (props) => {

    const [channels, setChannels] = useState(null);
    const [programs, setPrograms] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getAllChannels();
        getAllPrograms();
        getAllCategories();
    }, []);

    const getAllChannels = async () => {
        let channels = await fetch("/api/v1/channels");
        channels = await channels.json();
        setChannels(channels);
    };

    const getAllPrograms = async () => {
        let programs = await fetch("/api/v1/programs");
        programs = await programs.json();
        setPrograms(programs);
    };

    const getAllCategories = async () => {
        let categories = await fetch("/api/v1/categories");
        categories = await categories.json();
        setCategories(categories);
    };

    const values = {
        channels,
        programs,
        categories
    };

    return (
        <ContentContext.Provider value={values}>
            {props.children}
        </ContentContext.Provider>
    );

}

export default ContentContextProvider;