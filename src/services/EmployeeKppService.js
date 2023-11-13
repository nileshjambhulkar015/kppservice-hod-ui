import axios from "axios";

const BASE_URL="http://localhost:9091/hod-approval/employee-kpp?empId=1&statusCd=A";

class EmployeeKppService{

  
    getKPPDetails(){
        return axios.get(BASE_URL)
    }
}


export default new EmployeeKppService();