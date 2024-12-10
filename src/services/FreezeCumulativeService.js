import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

class FreezeCumulativeService {

    saveEmployeeKppFeedbackDetails(freezeEmpKPPMasterRequest){
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/freeze-cumulative/employee-kpp-feedback",freezeEmpKPPMasterRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }
    

}


export default new FreezeCumulativeService();