
import React, { useState } from 'react';
import "/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/style.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const EmployeeLogin = () => {

    //array for email and passwords
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:4000/employee/employee_login', values)
        //navigate to employee detail based on id after login if email and password are right
        .then(result => {
            if(result.data.loginStatus){
                localStorage.setItem('valid', true)
                navigate('/employee_detail/'+result.data.id)
            } else{
                setError(result.data.Error)
            }
            
    })
        .catch(err => console.log(err))
    }
  return (
    <div className = "d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className='p-3 rounded w-25 border loginForm'>
            <div className = 'text-danger'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
               <div className='mb-3'>
                    <label htmlFor = "email"><strong>Email:</strong></label>
                    <input type="email" name = "email" autoComplete="off" placeholder="Enter Email"
                    //seperate values and assign to email
                    onChange={(e) => setValues({...values, email: e.target.value})} className="form-control rounded-0"/>
               </div>
               <div className='mb-3'>
                    <label htmlFor = "password"><strong>Password:</strong></label>
                    <input type="password" name = "password" placeholder="Enter Password"
                    //seperate values and assign to password
                    onChange={(e) => setValues({...values, password: e.target.value})} className="form-control rounded-0"/>
               </div>
               <button className="btn btn-success w-100 rounded-0 mb-2">Log In</button>
               <div className='mb-1'>
                    <input type="checkbox" name="tick" id="tick" className="me-2"/>
                    <label htmlFor = "password">I'm not a robot</label>
               </div>
            </form>
        </div>
    </div>
  )
}

export default EmployeeLogin