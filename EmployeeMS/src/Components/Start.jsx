import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Start = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:4000/verify')
        .then(result => {
            if (result.data.Status) {
                if (result.data.role == 'admin') {
                    navigate('/dashboard')
                } else {
                    navigate('/employee_detail/' + result.data.id)
                }
            } 
        }).catch(err => console.log(err))
    }, [])
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className='p-3 rounded w-25 border loginForm'>
                <h2 className='text-center'>Login As</h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button className='btn btn-primary' type='button' onClick={() => { navigate('/employee_login') }}>Employee</button>
                    <button className='btn btn-success' type='button' onClick={() => { navigate('/adminlogin') }}>Admin</button>
                </div>
            </div>
        </div>
    )
}

export default Start