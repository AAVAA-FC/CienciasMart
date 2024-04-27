import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header';
import LoginMenu from './components/LoginMenu/LoginMenu';
import WelcomeMenu from './components/WelcomeMenu/WelcomeMenu';
import {CookiesProvider, useCookies, removeCookie} from 'react-cookie'

function App() {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    function handleLogin(user){
	setCookie('user', user, {path: '/'})
    }
    function handleLogout() {
        removeCookie('user', { path: '/' });
    }
    
    return (
        <CookiesProvider>
        { cookies.user ? (
                    <div>
                    <WelcomeMenu user={cookies.user} />
                    <button onClick={handleLogout}>Logout</button>
                    </div>
            ) : 
          <div className="App">
            <Header />
            <LoginMenu onHandleLogin={handleLogin} />
          </div>
        } </CookiesProvider>
    );
}

export default App;
