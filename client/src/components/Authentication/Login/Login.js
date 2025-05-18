import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';
import { TabTitle } from '../../../utils/General';

const Login = () => {
    TabTitle("Login - SanthoshYarns");
    
    return ( 
        <div className="login__auth__container">
            <div className="login__auth">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <LoginCard />
            </div>
        </div>
    );
}
 
export default Login;