import { client } from "@services/Axios.client";

const Home = () => {
    return (
        <div className="home">
            <button onClick={ getUserInfo }>Auth user info</button>
        </div>
    )
}

// Simple API call using Axios client to get current user info
async function getUserInfo() {
    try {
        const res = await client.get('auth/user-info');
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

export default Home;
