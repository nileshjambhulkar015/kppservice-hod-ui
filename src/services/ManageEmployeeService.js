import axios from "axios";
import Cookies from 'js-cookie';
import { LOGIN_UI_BASE_URL } from "./HodConstants";

const BASE_URL = `http://localhost:9091/hod-approval/employee?reportingEmployee=${Cookies.get('empId')}&page=0&size=20&sort=desig.desig_name`;

class ManageEmployeeService {

    getEmployeeDetailsByPagination() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getEmployeeByStatusByPagination(empKppStaus) {
        if (null != Cookies.get('empId')) {
            console.log("empKppStaus=",empKppStaus)
            return axios.get(`http://localhost:9091/hod-approval/employee?reportingEmployee=${Cookies.get('empId')}&empKppStatus=${empKppStaus}&page=0&size=20&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new ManageEmployeeService();