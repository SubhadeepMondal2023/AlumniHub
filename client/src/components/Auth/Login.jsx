import React from 'react'; 
import Input from "../../components/common/Input.jsx"; 
import { Button } from 'react-bootstrap'; 
import '../../css/login.css'; 

const Login = () => { 
  return ( 
    <div className="login-container"> 
      <h1>Login</h1> 
      <form>
        <Input type="text" placeholder="" name="Email" required /> 
        <Input type="password" placeholder="" name="Password" required /> 
        <div className="login-links">
          <p>Don't have an account? <a href="/register">Register</a></p> 
          <p>Forgot your password? <a href="/forgot">Reset</a></p> 
        </div>
        <Button variant="primary" type="submit">Login</Button> 
      </form>
    </div> 
  ); 
}; 

export default Login;