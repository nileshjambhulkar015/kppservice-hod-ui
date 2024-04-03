import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

const BASE_URL = BASE_URL_API+"/employee";

class EmployeeService {

    
    //search basic details of employee search by id
      //advance search of employee
      searchEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/employee/search-by-id?empId=${empId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
     
}


export default new EmployeeService()
