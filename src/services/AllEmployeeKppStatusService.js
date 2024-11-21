import axios from "axios";
import Cookies from 'js-cookie';

import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";


class AllEmployeeKppStatusService {

    getEmployeeDetailsByPagination(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee/employee-kpp-status?reportingEmployee=${Cookies.get('empId')}&empKppStatus=In-Progress&page=${data.currentPage-1}&size=${data.itemsPerPage}&sort=desig.desig_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getEmployeeByStatusByPagination(data) {
        if (null != Cookies.get('empId')) {
            
            return axios.get(BASE_URL_API+`/employee/employee-kpp-status?reportingEmployee=${Cookies.get('empId')}&empKppStatus=${data.empKppStaus}&page=${data.currentPage-1}&size=${data.itemsPerPage}&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new AllEmployeeKppStatusService();