import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import useGlobalContext from './hooks/useGlobalContext';
import { UsersProvider } from './context/UsersContext';

function Routes() {
  const ProtectedRoutes = (props) => {
    const { token } = useGlobalContext();

    return (
      <Route render={() => (token ? props.children : <Redirect to='/' />)} />
    );
  };
  return (
    <GlobalProvider>
      <Router>
        <Route path={['/', '/signIn']} exact component={SignIn} />
        <Route path={'/signUp'} exact component={SignUp} />
        <ProtectedRoutes>
          <UsersProvider>
            <Route path={'/home'} exact component={Home}></Route>
          </UsersProvider>
        </ProtectedRoutes>
      </Router>
    </GlobalProvider>
  );
}

export default Routes;
