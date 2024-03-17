

import axios from "axios";
import Cookies from 'js-cookie';
import { LOGIN_UI_BASE_URL } from "./HodConstants";

const BASE_URL = "http://localhost:9091/employee";

class CumumlativeService {

// view previous months kpp 
getEmployeeCumulative() {
    if (null != Cookies.get('empId')) {    
      //roleId=3&deptId=3&desigId=3&reportingEmpId=2
        return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
    } else {
        alert("You need to login first")
        window.location.replace(LOGIN_UI_BASE_URL);
    }
}

}

export default new CumumlativeService();