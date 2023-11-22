import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/hod-approval/employee?statusCd=A&page=0&size=20&sort=desig.desig_name";

class ManageEmployeeService {

    getEmployeeDetailsByPagination() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

}


export default new ManageEmployeeService();