import axios from "axios";
import Cookies from 'js-cookie';
import { LOGIN_UI_BASE_URL } from "./HodConstants";

const BASE_URL = `http://localhost:9091/employee-key-perform-parameter/kpp?roleId=${Cookies.get('roleId')}&deptId=${Cookies.get('deptId')}&desigId=${Cookies.get('desigId')}&statusCdEnum=A`;

class ManageHodKppsService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new ManageHodKppsService();