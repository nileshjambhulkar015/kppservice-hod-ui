import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ManageEmployeeService from '../../services/ManageEmployeeService';
import { useNavigate, useParams } from 'react-router-dom';


export default function ManageEmployeeComponent() {

    const navigate = useNavigate();
    const { empId } = useParams();

    const [empKppStatus, setEmpKppStatus] = useState('In-Progress')
    const [empResponses, setEmpResponses] = useState([])


    useEffect(() => {
        ManageEmployeeService.getEmployeeDetailsByPagination().then((res) => {
            setEmpResponses(res.data.responseData.content);

        });
    }, []);

    const onOptionChangeHandler = (event) => {
        console.log("event=", event)
        setEmpKppStatus(event);
    };

    const searchByEKpp = (e) => {
        console.log("data=", empKppStatus)
        ManageEmployeeService.getEmployeeByStatusByPagination(empKppStatus).then((res) => {
          
            setEmpResponses(res.data.responseData.content);
            console.log(res.data)
        });
    }

 /* const  handleNavigation=(empId,kppStatus)=>{
    if(kppStatus=="Pending")
    {alert("Please fill KPP first")}
    else{navigate(`/updateEmployeeKpp/${empId}`, { replace: true })}
  }*/

    return (
        <div className='container'>
            <div className="row">
          
                <div className="form-group">
                
                    <div className="row">
                    <form className="form-horizontal">
                        <label className="control-label col-sm-2" htmlFor="empKppStatus">KPP Status:</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="empKppStatus" id="empKppStatus"  value={empKppStatus} onChange={(e)=>onOptionChangeHandler(e.target.value)} defaultValue={empKppStatus} >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Approved">Approved</option>
                                <option value="Reject">Reject</option>
                            </select>  
                        </div>
                        </form>
                        <button type="submit" className="btn btn-success" onClick={(e) => searchByEKpp(e)} > Submit</button>
                    </div>
                </div>

                <form className="form-horizontal">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center'>Sr No</th>
                                <th className='text-center'>Employee Name</th>
                                <th className='text-center'>Employee Id</th>
                                <th className='text-center'>Designation Name</th>
                                <th className='text-center'>Mobile No</th>
                                <th className='text-center'>Overall Achivement</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                empResponses.map(

                                    (empResponse, index) =>
                                        <tr key={empResponse.empId} className="text-justify">

                                            <td className='text-center'>{index + 1}</td>
                                            <td>{empResponse.empFirstName + ' ' + empResponse.empMiddleName + ' ' + empResponse.empLastName}</td>
                                            <td className='text-center'>{empResponse.empEId}</td>
                                            <td className='text-center'>{empResponse.desigName}</td>
                                            <td className='text-center'>{empResponse.empMobileNo}</td>
                                            <td className='text-center'>{empResponse.kppOverallAchivement}</td>
                                            <td className='text-center'>{empResponse.empEKppStatus}</td>

                                            <td>
                                                <button type="submit" className="btn col-sm-offset-1 btn-success" disabled={empResponse.empEKppStatus=="Pending"} onClick={() => navigate(`/updateEmployeeKpp/${empResponse.empId}`, { replace: true })} >View</button></td>
                                        </tr>
                                )


                            }

                        </tbody>
                    </table>

                </form>

            </div>
            <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2">

                </div>
            </div>
        </div>


    );
}