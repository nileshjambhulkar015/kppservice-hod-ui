import axios from "axios";
import Cookies from 'js-cookie';
import {  BASE_URL_API, KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

class EmployeeKppsService {

     //get kpp details for hod updating rating 
     getKPPDetailsForHodRatings(empId) {
        console.log("before get call")
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/employee-kpp-status?empId=${empId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //get kpp details for hod updating rating of employee
   getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/employee-kpp-status?empId=${Cookies.get('empId')}`)
           // return axios.get(BASE_URL_API+`/employee-kpp-status?empId=${Cookies.get('empIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    saveEmployeeKppDetails(todos){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+"/employee-kpp",todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    // update employee rating by hod
    saveEmployeeKppRatingByHod(todos){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+"/hod-approval",todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    getEmployeeKPPReport(employeeId) {
        if (null != Cookies.get('empId')) {    
            console.log(employeeId)       
            return axios.get(BASE_URL_API+`/report/employee-kpp-status?empId=${employeeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

     // view previous months kpp  bt from date and to date
     getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {    
                 
            return axios.get(BASE_URL_API+`/employee/employee-kpp-status-report?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

     // view previous months kpp 
     getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {    
                 
            return axios.get(BASE_URL_API+`/employee/employee-kpp-status-report?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new EmployeeKppsService();