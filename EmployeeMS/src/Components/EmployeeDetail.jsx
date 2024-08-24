import React from 'react'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
		axios.get('http://localhost:4000/employee/logout')
		.then(result => {
            if(result.data.Status) {
                localStorage.removeItem('valid')
                navigate('/')
            }
			
		}).catch(err => console.log(err));
	}
  return (
    <div>
        <div className = 'p-2 d-flex justify-content-center shadow'>
            <h4>Employee Management System</h4>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`http://localhost:4000/images/`+employee.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail