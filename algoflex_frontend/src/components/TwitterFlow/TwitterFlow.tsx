import TweetEmbed from 'react-tweet-embed';
import axios from "axios";

const TwitterFlow = () => {
    let config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }

    axios.get('https://twitter.com/1.1/lists/statuses.json?screen_name=AlgoflexPro', config)
        .then(response => console.log('RESPONSE', response));
    console.log("aaa");
    return (
        //TODO: map get request response with TweetEmbed comp
        <TweetEmbed id='1441001012878270470'/>
    );
};

export default TwitterFlow;
