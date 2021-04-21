import { useContext } from "react";

import { ChannelContext } from "../contexts/ChannelContext";

function Home() {

    const { channels } = useContext(ChannelContext);

    return (
        <div className="container">
            <h1>Home works</h1>
        </div>
    );
}

export default Home;