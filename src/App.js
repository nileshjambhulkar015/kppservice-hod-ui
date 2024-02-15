import Cookies from 'js-cookie';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddHodKppRatingsComponent from "./components/AddHodKppRatingsComponent/AddHodKppRatingsComponent";
import AllEmployeeKppStatusComponent from "./components/AllEmployeeKppStatusComponent/AllEmployeeKppStatusComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import EmplyeeUpdateKppRatingsComponent from "./components/EmplyeeUpdateKppRatingsComponent/EmplyeeUpdateKppRatingsComponent";
import ViewProfileComponent from "./components/ViewProfileComponent/ViewProfileComponent";


function App() {
  //remove cookies when click on logout
  const removeCookies = () => {
    Cookies.remove('empId');
    Cookies.remove('roleId');
    Cookies.remove('roleName');
    Cookies.remove('deptId');
    Cookies.remove('deptName');
    Cookies.remove('desigId');
    Cookies.remove('desigName');
    Cookies.remove('empEId');
    Cookies.remove('empFirstName');
    Cookies.remove('empMiddleName');
    Cookies.remove('empLastName');
  }

  return (

    <BrowserRouter>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://localhost:3008" onClick={() => removeCookies()}>FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">

            <li><Link to="/addHodKpp">Add Hod KPP</Link></li>
            <li><Link to="/allEmployeeKppStatus">Employees KPP Status</Link></li>
            <li><Link to="/viewProfile">View Profile</Link></li>
            <li><Link to="/changePassword">Change Password</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li><a href="http://localhost:3008" onClick={() => removeCookies()}>Logout</a></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<AddHodKppRatingsComponent />}></Route>
        <Route exact path="/addHodKpp" element={<AddHodKppRatingsComponent />}></Route>
        <Route exact path="/allEmployeeKppStatus" element={<AllEmployeeKppStatusComponent />}></Route>
        <Route exact path="/updateEmployeeKpp" element={<EmplyeeUpdateKppRatingsComponent />}></Route>
        <Route exact path="/viewProfile" element={<ViewProfileComponent />}></Route>
        <Route exact path="/changePassword" element={<ChangePasswordComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
