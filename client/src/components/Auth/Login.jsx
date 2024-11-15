import React from 'react'; 
import Input from "../../components/common/Input.jsx"; 
import { Button } from 'react-bootstrap'; 
import '../../css/login.css'; 
import { Link } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';

const Login = () => { 
  return ( 
    <div className="login-page"> 
      <div className="login-container"> 
        <h1>Login</h1> 
        <div>
          <Input type="text" placeholder="" name="Email" /> 
          <Input 
            type="password" 
            placeholder="" 
            name="Password" 
            Component={
              <Link to="/forgot-password" style={{ textDecorationLine: 'none', color: 'white' }}>
                Forgot Password?
              </Link>
            } 
          /> 

          <div className="login-links"></div>
          <Button variant="primary">Login</Button> 
        </div>

        {/* Horizontal break line with "or" */}
        <div className="or-divider">
          <hr />
          <span className="or-text">or</span>
          <hr />
        </div>

        <SocialLoginButton />
        <p>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecorationLine: 'none' }}>
            Register
          </Link>
        </p> 
      </div> 
    </div> 
  ); 
}; 

export default Login;
