import About from '@views/About';
import Home from '@views/Home';
import Authentification from '@views/Authentification';
import ForgetPassword from '@views/ForgetPassword';
import Editeur from '@views/Editeur';
import Themes from '@views/Themes';
import Exercices from '@views/Exercices';

interface Route{
    component: any,
    path: string,
    authenticated: boolean
}

const routes: Route[] = [
    { component: About, path: '/about', authenticated: false},
    { component: Home, path: '/', authenticated: false },
    { component: Authentification, path: '/login', authenticated: false},
    { component: ForgetPassword, path: '/forgetPassword', authenticated: false},
    { component: Editeur, path: '/exercice/:id', authenticated: false},
    { component: Themes, path: '/themes', authenticated: false},
    { component: Exercices, path: '/theme/:id', authenticated: false}
];


export default routes;