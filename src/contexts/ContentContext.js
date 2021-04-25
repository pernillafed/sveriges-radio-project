import { createContext, useEffect, useState } from 'react';

const prefixPath = "/api/v1";

export const ContentContext = createContext();

const ContentContextProvider = (props) => {

    const [channels, setChannels] = useState(null);
    const [programs, setPrograms] = useState(null);
    const [categories, setCategories] = useState(null);

    const [channel, setChannel] = useState(null);
    const [category, setCategory] = useState(null);

    const [channelSchedule, setChannelSchedule] = useState(null);

    const [channelPrograms, setChannelPrograms] = useState(null);
    const [categoryPrograms, setCategoryPrograms] = useState(null);

    useEffect(() => {
        getAllChannels();
        getAllPrograms();
        getAllCategories();
    }, []);

    const getAllChannels = async () => {
        let channels = await fetch(`${prefixPath}/channels`);
        channels = await channels.json();
        setChannels(channels);
    };

    const getAllPrograms = async () => {
        let programs = await fetch(`${prefixPath}/programs`);
        programs = await programs.json();
        setPrograms(programs);
    };

    const getAllCategories = async () => {
        let categories = await fetch(`${prefixPath}/categories`);
        categories = await categories.json();
        setCategories(categories);
    };

    const getChannelById = async (channelId) => {
        let channel = await fetch(`${prefixPath}/channels/${channelId}`);
        channel = await channel.json();
        setChannel(channel);
    };
    
    const getCategoryById = async (categoryId) => {
        let category = await fetch(`${prefixPath}/categories/${categoryId}`);
        category = await category.json();
        setCategory(category);
    };

    const getChannelSchedule = async (channelId) => {
        let schedule = await fetch(`${prefixPath}/channels/schedule/${channelId}`);
        schedule = await schedule.json();
        setChannelSchedule(schedule);
    };

    const getProgramsByChannel = async (channelId) => {
        let programs = await fetch(`${prefixPath}/channels/programs/${channelId}`);
        programs = await programs.json();
        setChannelPrograms(programs);
    };

    const getProgramsByCategory = async (categoryId) => {
        let programs = await fetch(`${prefixPath}/categories/programs/${categoryId}`);
        programs = await programs.json();
        setCategoryPrograms(programs);
    };

    const values = {
        channels,
        programs,
        categories,
        channel,
        category,
        channelSchedule,
        channelPrograms,
        categoryPrograms,
        getChannelById,
        getCategoryById,
        getChannelSchedule,
        getProgramsByChannel,
        getProgramsByCategory
    };

    return (
        <ContentContext.Provider value={values}>
            {props.children}
        </ContentContext.Provider>
    );

}

export default ContentContextProvider;