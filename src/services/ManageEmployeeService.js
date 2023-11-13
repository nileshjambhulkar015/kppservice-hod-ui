import axios from "axios";

const BASE_URL="http://localhost:9091/hod-approval/employee?statusCd=A&page=0&size=20&sort=desig.desig_name";

class ManageEmployeeService{

    getEmployeeDetailsByPagination(){
        return axios.get(BASE_URL)
    }
   
}


export default new ManageEmployeeService();