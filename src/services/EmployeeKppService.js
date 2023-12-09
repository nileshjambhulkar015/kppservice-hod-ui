import axios from "axios";
import Cookies from 'js-cookie';
import { KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./EmployeeConstants";
const BASE_URL = "http://localhost:9091/hod-approval/employee-kpp?empId=1&statusCd=A";

class EmployeeKppService {


    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    saveEmployeeKppDetails(todos){
     
        if (null != Cookies.get('empId')) {
            return axios.put(KPP_API_BASE_URL+"/employee-key-perform-parameter",todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

}


export default new EmployeeKppService();