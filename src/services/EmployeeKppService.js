import axios from "axios";
import Cookies from 'js-cookie';
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
}


export default new EmployeeKppService();