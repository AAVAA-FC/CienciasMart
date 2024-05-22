import logo from '../../logo.svg';
import Header from '../Header/Header';
import LoginMenu from './LoginMenu';
import WelcomeMenu from '../WelcomeMenu/WelcomeMenu';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import '../../App.css';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
      if(user !== null){
        if(user.userRole == "buyer") {
          navigate('/comprar');
        } else {
          navigate('/'); // cambiar a /vender
        }
      }
    }, [navigate, user]); 

    return (
          <div className="App">
            <Header />
            <LoginMenu />
          </div>
    );
}

export default Login;
