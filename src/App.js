import React from "react";
import {Route, BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import ManageHodKppComponent from "./components/HodKppComponent/ManageHodKppComponent";
import ManageEmployeeComponent from "./components/ManageEmployeeComponent/ManageEmployeeComponent";
import EmployeeKppComponent from "./components/EmployeeKppComponent/EmployeeKppComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import UpdateHodProfileComponent from "./components/UpdateHodProfileComponent/UpdateHodProfileComponent";



function App() {
  return (
  
      <Router>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">      
            <li><Link to="/hodKpp">Add KPP</Link></li>
            <li><Link to="/manageEmployee">View Employees</Link></li>    
            <li><Link to="/updateHodProfile">View Profile</Link></li>  
            <li><Link to="/changePassword">Change Password</Link></li>         
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> e1234</a></li>
            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
          </ul>
        </div>
      </nav>
      <Switch>     
        <Route exact path="/hodKpp" component={ManageHodKppComponent}></Route>
        <Route exact path="/manageEmployee" component={ManageEmployeeComponent}></Route>
        <Route exact path="/updateEmployeeKpp/:empId" component={EmployeeKppComponent}></Route>
        <Route exact path="/updateHodProfile" component={UpdateHodProfileComponent}></Route>
        <Route exact path="/changePassword" component={ChangePasswordComponent}></Route>
      </Switch>
    </Router>    
    );
}

export default App;
