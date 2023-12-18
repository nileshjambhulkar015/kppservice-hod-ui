import axios from "axios";
import Cookies from 'js-cookie';
import { LOGIN_UI_BASE_URL } from "./HodConstants";
class ChangePasswordService {

    updatePassword(userName, userPassword) {

        if (null != Cookies.get('empId')) {
            return axios.put(`http://localhost:9091/login/change-password?userName=${userName}&userPassword=${userPassword}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new ChangePasswordService();