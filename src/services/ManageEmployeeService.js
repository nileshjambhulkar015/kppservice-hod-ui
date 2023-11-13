import axios from "axios";

const BASE_URL="http://localhost:9091/employee-key-perform-parameter?roleId=2&deptId=2&desigId=3&statusCdEnum=A";

class ManageEmployeeService{

    getKPPDetails(){
        return axios.get(BASE_URL)
    }
   
}


export default new ManageEmployeeService();