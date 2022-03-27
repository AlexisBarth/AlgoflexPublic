import About from '@views/About';
import Home from '@views/Home';
import Login from '@views/Login';
import Signup from '@views/Signup';
import ForgetPassword from '@views/ForgetPassword';
import Editeur from '@views/Editeur';
import UserSettings from "@views/UserSettings";

interface Route{
    component: any,
    path: string,
    authenticated: boolean
}

const routes: Route[] = [
    { component: About, path: '/about', authenticated: false},
    { component: Home, path: '/', authenticated: false },
    { component: Login, path: '/login', authenticated: false},
    { component: Signup, path: '/signup', authenticated: false},
    { component: ForgetPassword, path: '/forgetPassword', authenticated: false},
    { component: Editeur, path: '/editeur', authenticated: true},
    { component: UserSettings, path: '/userSettings', authenticated: true}
];


export default routes;