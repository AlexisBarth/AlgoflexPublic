import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>Erreur 404</h1>
            <Link to='/'>Go Home</Link>
        </div>
    );
};

export default NotFound;