import Navigation from "../Navigation";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <Navigation/>
            <Link className="simpleLink" to="/signup">inscription</Link>
            <br />
            <Link className="simpleLink" to="/login">Connexion</Link>
        </div>
    )
}

export default Home;