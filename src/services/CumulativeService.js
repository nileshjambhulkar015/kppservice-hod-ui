import axios from "axios";
import Cookies from 'js-cookie';
import { LOGIN_UI_BASE_URL } from "./EmployeeConstants";

class CumulativeService {

    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    // view previous months kpp 
    getOverallEmployeeCumulative() {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getOverallEmployeeCumulativeByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?fromDate=${fromDate}&toDate=${toDate}&reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}&page=0&size=1200`)
          //  return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


   // http://localhost:9091/cumulative/hod-cummulatve?fromDate=2024-03-01&toDate=2024-03-23&roleId=3&reportingEmpId=2

    //when HOD want to view single employee kpp ratings

        // view previous months kpp 
        getSingleEmployeeKppReportDetailsByPaging() {
            if (null != Cookies.get('empId')) {
    
                return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleEmpIdForKppRatings')}`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    
        // view previous months kpp  bt from date and to date
        getSingleEmployeeKppReportByDates(fromDate, toDate) {
            if (null != Cookies.get('empId')) {
    
                return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=0&size=1200`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    

}


export default new CumulativeService();