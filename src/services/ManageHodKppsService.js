import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL=`http://localhost:9091/employee-key-perform-parameter/kpp?roleId=${Cookies.get('roleId')}&deptId=${Cookies.get('deptId')}&desigId=${Cookies.get('desigId')}&statusCdEnum=A`;

class ManageHodKppsService{

    getKPPDetails(){
        return axios.get(BASE_URL)
    }
   
}


export default new ManageHodKppsService();