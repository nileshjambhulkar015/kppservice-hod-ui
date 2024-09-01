import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

class CumulativeService {

    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    // view previous months kpp 
    getOverallEmployeeCumulative() {
        if (null != Cookies.get('empId')) {
            
            return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getOverallEmployeeCumulativeByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {
            
            return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?fromDate=${fromDate}&toDate=${toDate}&reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}&page=0&size=1200`)
          
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


   

    //when HOD want to view single employee kpp ratings

        // view previous months kpp 
        getSingleEmployeeKppReportDetailsByPaging() {
            if (null != Cookies.get('empId')) {
    
                return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleEmpIdForKppRatings')}`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    
        // view previous months kpp  bt from date and to date
        getSingleEmployeeKppReportByDates(fromDate, toDate) {
            if (null != Cookies.get('empId')) {
    
                return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=0&size=1200`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    

}


export default new CumulativeService();