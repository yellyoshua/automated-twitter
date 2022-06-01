import { createContext, useState } from "react";

export const TweetsContext = createContext({});

export default function TweetsProvider(props) {
    const [tweets, setTweets] = useState([]);
    const [tweetsLoading, setTweetsLoading] = useState(false);
    const [tweetsError, setTweetsError] = useState(null);

    return <TweetsContext.Provider value={{
        tweets,
        tweetsLoading,
        tweetsError,
        setTweets,
        setTweetsLoading,
        setTweetsError, 
    }}>
        {props.children}
    </TweetsContext.Provider>
};