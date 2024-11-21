import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

class CumulativeService {

    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?fromDate=${data.fromDate}&toDate=${data.toDate}&empId=${Cookies.get('empId')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    // view previous months kpp 
    getOverallEmployeeCumulative(data) {
        if (null != Cookies.get('empId')) {
            
            return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getOverallEmployeeCumulativeByDates(data) {
        if (null != Cookies.get('empId')) {
            
            return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?fromDate=${data.fromDate}&toDate=${data.toDate}&reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
          
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


   

    //when HOD want to view single employee kpp ratings

        // view previous months kpp 
        getSingleEmployeeKppReportDetailsByPaging(data) {
            if (null != Cookies.get('empId')) {
    
                return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    
        // view previous months kpp  bt from date and to date
        getSingleEmployeeKppReportByDates(data) {
            if (null != Cookies.get('empId')) {
    
                return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?fromDate=${data.fromDate}&toDate=${data.toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=${data.currentPage-1}&size=${data.itemsPerPage}`)
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
        }
    

}


export default new CumulativeService();