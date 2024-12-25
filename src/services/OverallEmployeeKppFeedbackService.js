import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";



class OverallEmployeeKppFeedbackService {

      ///for employee
    getEmployeeKppDetailsByPagination(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/overall-kpp-feedback/employee?empKppStatus=In-Progress&roleId=3&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    searchEmployeeKppDetailsByPagination(data) {
        if (null != Cookies.get('empId')) {
            //for admin we need to fetch all in progress kpp request
            return axios.get(BASE_URL_API + `/overall-kpp-feedback/employee?roleId=3&empKppStatus=${data.empKppStatus}&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    
    ddAllFinancialYear() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/cumulative/dd-report-fin-year")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
    
  

    //Gm Give feedback on Hod Feedback
    saveEmployeeKppFeedbackDetails(freezeEmpKPPMasterRequest){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+"/overall-kpp-feedback/gm-kpp-feedback",freezeEmpKPPMasterRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

     //HOD Give feedback on Hod Feedback
     updateHODFeedbackForEmployee(freezeEmpKPPMasterRequest){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+"/overall-kpp-feedback/hod-kpp-feedback-employee",freezeEmpKPPMasterRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    //get kpp details for hod updating rating of employee
    getEmployeeKPPDetailsYearly(finYear) {
        console.log("finYear : ", finYear)
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/overall-kpp-feedback/yearly-kpp?empId=${Cookies.get('empIdForKppFeedback')}&finYear=${Cookies.get('empFinYearForKppFeedback')}`)
          
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    completeEmpKppGM(finYear) {
        console.log("Comple finYear : ", finYear)
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/gm-approval/finish?empId=${Cookies.get('empIdForKppRatings')}&finYear=${finYear}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new OverallEmployeeKppFeedbackService();