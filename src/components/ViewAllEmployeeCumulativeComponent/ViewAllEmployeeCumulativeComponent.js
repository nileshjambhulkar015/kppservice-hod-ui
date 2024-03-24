import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CumulativeService from "../../services/CumulativeService";
import EmployeeKppsService from "../../services/EmployeeKppsService";
export default function ViewAllEmployeeCumulativeComponent() {

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [sumOfEmployeeRatings, setSumOfEmployeeRatings] = useState()
    const [sumOfHodRatings, setSumOfHodRatings] = useState()
    const [sumOfGMRatings, setSumOfGMRatings] = useState()

    const [cummulativeRatings, setCummulativeRatings] = useState()
    const [avgCummulativeRatings, setAvgCummulativeRatings] = useState()

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        CumulativeService.getOverallEmployeeCumulative().then((res) => {
            if (res.data.success) {
                setEmployees(res.data.responseData);
            }
            else {
                alert("Kpp is not approved for month");
            }

        }).catch((err) => {
            alert(err.response.data.details)
        });

    }, []);


    const getKPPDetailsByDate = (e) => {
        CumulativeService.getOverallEmployeeCumulativeByDates(fromDate, toDate).then((res) => {
            if (res.data.success) {
                setEmployees(res.data.responseData);
            } else {
                alert("Kpp is not found for month");

            }


        });

    }

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }


    const navigateToViewEmployeeRating=(empId)=>{
        console.log("New empId =",empId)
        Cookies.set('viewSingleEmpIdForKppRatings', empId);
        navigate(`/viewSingleEmployeeRatings`, { replace: true })       
    }

    return (
        <div className="row">
            <h3 className="text-center">View KPP</h3>
            <div className="form-group">
                <form className="form-horizontal" enctype="multipart/form-data">
                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> From Date:</label>
                    <div className="col-sm-2">
                        <input type="date" className="form-control" defaultValue={fromDate} name="fromDate" onChange={(e) => setFromDate(e.target.value)} />
                    </div>

                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> To Date:</label>
                    <div className="col-sm-2">
                        <input type="date" className="form-control" defaultValue={toDate} name="toDate" onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={(e) => getKPPDetailsByDate(fromDate, toDate)}>Search</button>
            </div>


            <div className="col-sm-8">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Sr No</th>
                            <th className="text-center">Employee Name</th>
                            <th className="text-center">Employee Designation</th>
                            <th className="text-center">Total Ratings</th>
                            <th className="text-center">Total Month</th>
                            <th className="text-center">Average Cumulative</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                (employee, index) =>   //index is inbuilt variable of map started with 0
                                    <tr key={employee.empId}>
                                        <td className="text-center">{index + 1}</td>
                                       
                                        <td className="text-center">{employee.empName}</td>
                                        <td className="text-center">{employee.desigName}</td>
                                        <td className="text-center">{employee.totalHodKppRatings}</td>
                                        <td className="text-center">{employee.totalMonths}</td>
                                        <td className="text-center">{employee.avgTotalHodKppRatings}</td>
                                        <td className="text-center">{employee.empId}</td>
                                        <td className="text-center">
                                        
                                       
                                        <button type="submit" className="btn btn-info" onClick={() => navigateToViewEmployeeRating(employee.empId)}>View Details</button>
                                        
                                        </td>
                                    </tr>

                            )

                        }
                    </tbody>

                </table>
            </div>





        </div>

    );
}