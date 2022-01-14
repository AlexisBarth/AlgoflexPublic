import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, NotFound} from '@components';
import IsAuthenticated from '@services/Authentication.utils';
import routes from './routes';


const App = () => {

	const GetRoutes = () => {
		return <Switch>{routes.map((element) => {
			if(element.authenticated && !IsAuthenticated()){
				return null;
			}
			return <Route key={element.path} path={element.path} exact component={element.component} />;
		}).concat(<Route key={"notfound"} component={NotFound} />)}
		</Switch>;
	}

	return (
		<BrowserRouter>
			<Navbar />
			<GetRoutes />
		</BrowserRouter>
	);
};

export default App;