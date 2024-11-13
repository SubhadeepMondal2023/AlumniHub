import React from 'react'; 
import Input from "../../components/common/Input.jsx"; 
import { Button } from 'react-bootstrap'; 
import '../../css/login.css'; 
import { Link } from 'react-router-dom';

const Login = () => { 
  return ( 
    <div className="login-container"> 
      <h1>Login</h1> 
      <form>
        <Input type="text" placeholder="" name="Email" required /> 
        <Input type="password" placeholder="" name="Password" required /> 
        <div className="login-links">
          <p>Don't have an account? <Link to="/register">Register</Link></p> 
          <p>Forgot your password? <Link to="/forgot">Reset</Link></p> 
        </div>
        <Button variant="primary">Login</Button> 
      </form>
    </div> 
  ); 
}; 

export default Login;