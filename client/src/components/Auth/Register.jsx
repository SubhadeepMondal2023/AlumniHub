import React from 'react'; 
import Input from "../../components/common/Input.jsx"; 
import { Button } from 'react-bootstrap'; 
import '../../css/login.css'; 

const Register = () => { 
  return ( 
    <div className="register-container"> 
      <h1>Register</h1> 
      <form>
        <Input type="text"  name="Email" placeholder="" required /> 
        <Input type="password" placeholder="" name="Password" required /> 
        <Input type="password" placeholder="" name="ConfirmPassword" required />
        <Button variant="primary" type="submit">Register</Button> 
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div> 
  ); 
}; 

export default Register;