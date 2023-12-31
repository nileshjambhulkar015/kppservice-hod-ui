import axios from "axios";
import Cookies from 'js-cookie';
import { KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./HodConstants";
//const BASE_URL = `http://localhost:9091/hod-approval/employee-kpp?empId=${}&statusCd=A`;

class UpdateEmployeeKppRatingsService {


    getKPPDetails(empId) {
        console.log("new emop Id : ", empId)
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/hod-approval/employee-kpp?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
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

    updateEmpArroveOrRejectByHod(todos){
     
        if (null != Cookies.get('empId')) {
            return axios.put(KPP_API_BASE_URL+"/hod-approval",todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

}


export default new UpdateEmployeeKppRatingsService