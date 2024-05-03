import logo from '../../logo.svg';
import Header from '../Header/Header';
import LoginMenu from './LoginMenu';
import WelcomeMenu from '../WelcomeMenu/WelcomeMenu';
import { useAuth } from '../../hooks/useAuth';

function Login() {
    const { user } = useAuth();
    const { logout } = useAuth();
    console.log("user: ");
    console.log(user);

    return (
        <>
        { user ? (
                    <div>
                    <WelcomeMenu />
                    <button onClick={() => logout()}>Logout</button>
                    </div>
            ) : 
          <div className="App">
            <Header />
            <LoginMenu />
          </div>
        } </>
    );
}

export default Login;
