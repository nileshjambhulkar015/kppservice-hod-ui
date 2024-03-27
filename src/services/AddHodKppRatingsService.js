import axios from "axios";
import Cookies from 'js-cookie';
import { KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./HodConstants";
import { BASE_URL_API } from "./EmployeeConstants";

class AddHodKppRatingsService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
           
            return axios.get(BASE_URL_API+`/employee-kpp-status?empId=${Cookies.get('empId')}`)
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


}


export default new AddHodKppRatingsService();