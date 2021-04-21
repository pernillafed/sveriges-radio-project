import { createContext, useEffect, useState } from 'react';

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {

    const [channels, setChannels] = useState(null);

    useEffect(() => {
        getAllChannels();
    }, []);

    const getAllChannels = async () => {
        let channels = await fetch("/api/v1/channels");
        channels = await channels.json();
        setChannels(channels);
    };

    const values = {
        channels
    };

    return (
        <ChannelContext.Provider value={values}>
            {props.children}
        </ChannelContext.Provider>
    );

}

export default ChannelContextProvider;