import Cookies from 'js-cookie';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddHodKppRatingsComponent from "./components/AddHodKppRatingsComponent/AddHodKppRatingsComponent";
import AllEmployeeKppStatusComponent from "./components/AllEmployeeKppStatusComponent/AllEmployeeKppStatusComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import EmplyeeUpdateKppRatingsComponent from "./components/EmplyeeUpdateKppRatingsComponent/EmplyeeUpdateKppRatingsComponent";
import HODCumulativeKppComponent from './components/HODCumulativeKppComponent/HODCumulativeKppComponent';
import ViewAllEmployeeCumulativeComponent from './components/ViewAllEmployeeCumulativeComponent/ViewAllEmployeeCumulativeComponent';
import ViewProfileComponent from "./components/ViewProfileComponent/ViewProfileComponent";
import SingleEmployeeCumulativeComponent from './components/SingleEmployeeCumulativeComponent/SingleEmployeeCumulativeComponent';
import HODAllEmployeeComponent from './components/HODAllEmployeeComponent/HODAllEmployeeComponent';
import ComplaintComponent from './components/ComplaintComponent/ComplaintComponent';
import PendingEmployeeComplaintComponent from './components/EmployeeComplaintMaster/PendingEmployeeComplaintComponent';
import ResolveEmployeeComplaintComponent from './components/EmployeeComplaintMaster/ResolveEmployeeComplaintComponent';


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
          

            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Cumulative Master
            <span className="caret"></span></a>
            <ul className="dropdown-menu">          
   
            <li><Link to="/viewHoDCumulativeKpp">View HOD Cumulative Kpp</Link></li>
            <li><Link to="/viewEmployeeCumulativeKpp">View Employee Cumulative Kpp</Link></li>
        
            </ul>
          </li>

          <li><Link to="/viewAllEmployeeByHODId">View All Employee</Link></li>
          <li><Link to="/viewProfile">View Profile</Link></li>
            
          <li><Link to="/changePassword">Change Password</Link></li>
          <li><Link to="/complaint">Complaint Management</Link></li>
          <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee Complaint
          <span className="caret"></span></a>
          <ul className="dropdown-menu">          
 
          <li><Link to="/pendingEmployeeComplaint">Pending Employee Complaint</Link></li>
          <li><Link to="/resolveEmployeeComplaint">View Employee Cumulative Kpp</Link></li>
      
          </ul>
        </li>
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
        <Route exact path="/viewHoDCumulativeKpp" element={<HODCumulativeKppComponent />}></Route>
        <Route exact path="/viewEmployeeCumulativeKpp" element={<ViewAllEmployeeCumulativeComponent />}></Route>
        <Route exact path="/viewAllEmployeeByHODId" element={<HODAllEmployeeComponent />}></Route>
        <Route exact path="/changePassword" element={<ChangePasswordComponent />}></Route>

        <Route exact path="/viewSingleEmployeeRatings" element={<SingleEmployeeCumulativeComponent />}></Route>
        <Route exact path="/complaint" element={<ComplaintComponent />}></Route>
        <Route exact path="/pendingEmployeeComplaint" element={<PendingEmployeeComplaintComponent />}></Route>
        <Route exact path="/resolveEmployeeComplaint" element={<ResolveEmployeeComplaintComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
