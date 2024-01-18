import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import baseurl from "../../Api";





const Login = () => {

  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });



  const navigate=useNavigate()

  

     const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
       

      const response = await axios.post(baseurl+'/login/loginview', {
        email: email,
        password: password,
      });
        
  
        if (response.data.success) {
          alert('Login successful');
          console.log(response.data);
          navigate('/homepage');
        } 
        else {
          setError('Invalid User ID or Password. Please try again.');
          console.log(response.data);

        }
      } catch (err) {
        setError('Error occurred during login. Please try again.');
      }
    };
      




  return (
    <div className="login">
    <span className="loginTitle">Login</span>
    <form className="loginForm" onSubmit={handleSubmit}>
      <label>Email</label>
      <input className="loginInput" type="text"  name="email"  placeholder="Enter your email..."
      value={email}
      onChange={(e) => setEmail(e.target.value)} />

       {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}<br/>

      <label>Password</label>
      <input className="loginInput" type="password" name="password" placeholder="Enter your password..." 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>

{formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}<br/>

      <button className="loginButton" >Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
      <button className="loginRegisterButton">Register</button>
      </div>
        
  )
  
}

export default Login