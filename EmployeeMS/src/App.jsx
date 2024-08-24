import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Login from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Login.jsx';
import Dashboard from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Dashboard.jsx';
import Home from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Home.jsx';
import Employee from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Employee.jsx';
import Category from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Category.jsx';
import Profile from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/Profile.jsx';
import AddCategory from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/AddCategory.jsx';
import AddEmployee from '/Users/aymancharania/Desktop/Employee MS/EmployeeMS/src/Components/AddEmployee.jsx';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route path="/employee_detail/:id" element={<EmployeeDetail/>} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>}>
          <Route path='' element={<Home />} /> 
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
          <Route path="/dashboard/edit_employee/:id" element={<EditEmployee/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
