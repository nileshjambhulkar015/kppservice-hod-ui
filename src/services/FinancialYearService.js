import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API + "/financial-year";


class FinancialYearService {

   
     //when click on view button of UI
     getFinancialYearById(finYearId) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL + `/by-finyear?finYearId=${finYearId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    ddAllFinancialYear() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + "/dd-fin-year")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
    
}


export default new FinancialYearService();