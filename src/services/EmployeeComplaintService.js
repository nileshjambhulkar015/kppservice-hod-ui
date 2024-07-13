import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

const BASE_URL = BASE_URL_API+"/complaint";


class EmployeeComplaintService {



   



    //at page load call all the departments load all departments
    getEmployeeCompaintsDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?compTypeRoleId=${Cookies.get('roleId')}&compTypeDeptId=${Cookies.get('deptId')}&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

       //at page load call all the departments load all departments
       getResolveEmployeeCompaintsDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?compStatus=Resolve&compTypeRoleId=${Cookies.get('roleId')}&compTypeDeptId=${Cookies.get('deptId')}&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search complaint  by its complaint id
    getComplaintDetailsByCompIdPaging(compId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?compStatus=Resolve&compTypeRoleId=${Cookies.get('roleId')}&compTypeDeptId=${Cookies.get('deptId')}compId=${compId}&statusCd=A&page=0&size=20&sort=empCompId`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    // search complaint  by its complaint id
    getComplaintDetailsByCompIdPaging(compId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?compId=${compId}&statusCd=A&page=0&size=20&sort=empCompId`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
   
     //Upload department
     uploadExcelDept(formData) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/department/upload-department",formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },});
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
        
    }

    getAllDepartmentExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/department/all-dd-dept-except-gm")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    ////////////////
    getAllComplaintType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/complaint-type/all-dd-comp-type")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    saveComplaintDetails(complaint) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL+"/employee-complaint", complaint)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     //when click on view button of UI
     getComplaintById(empCompId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-emp-comp-id?empCompId=${empCompId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    
    updateComplaintDetails(complaintdata) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL+"/admin-handle-complaint", complaintdata)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
deleteEmployeeComplaintById(empCompId) {
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/employee-complaint?empCompId=${empCompId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //at page load call all the departments load all departments
    getResolveEmployeeCompaintsDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?compStatus=Resolve&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


}


export default new EmployeeComplaintService();