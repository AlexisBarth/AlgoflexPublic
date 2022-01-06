import { NavLink } from 'react-router-dom';
import { Logout } from '@components';
import IsAuthenticated from '@services/Authentication.utils';

const Navbar = () => {

    const AuthCheck = () => {
        if(IsAuthenticated()){
            return (<>
                    <NavLink exact to="editeur" activeClassName='nav-active'>
                        Editeur
                    </NavLink>
                    <Logout />
                </>);
        }
        return(<>
                <NavLink exact to="login" activeClassName="nav-active">
                    Connexion
                </NavLink> 
            </>);
    }

    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="about" activeClassName="nav-active">
                A propos
            </NavLink>
            <AuthCheck />
        </div>
    );
};

export default Navbar;