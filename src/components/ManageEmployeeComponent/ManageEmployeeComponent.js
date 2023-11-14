import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ManageEmployeeService from '../../services/ManageEmployeeService';
import {Link, useHistory,useParams} from 'react-router-dom';


export default function ManageEmployeeComponent(){
    
    const history=useHistory();
    const {empId}=useParams();

    const [empResponses, setEmpResponses] = useState([])


    useEffect(() => {
        ManageEmployeeService.getEmployeeDetailsByPagination().then((res) => {
            setEmpResponses(res.data.responseData.content);
           
        });
    }, []);



    return(
        <div className='container'>
            <div className="row">
                <form className="form-horizontal">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Sr No</th>
                                <th>Employee Name</th>
                                <th>Designation Name</th>
                                <th>Overall Achivement</th>
                                <th>Action</th>             
                            </tr>
                        </thead>
                        <tbody>
                       
                            {
                                 
                                 empResponses.map(
                                    
                                    (empResponse, index) =>
                                        <tr key={empResponse.empId} className="text-justify">

                                            <td>{index+1}</td>
                                            <td>{empResponse.empFirstName+' '+empResponse.empMiddleName+' '+empResponse.empLastName}</td>
                                            <td>{empResponse.desigName}</td>                                     
                                            <td>{empResponse.kppOverallAchivement}</td>
                                            <td> 
                                                   
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" onClick={() => history.push(`/updateEmployeeKpp/${empResponse.empId}`)} >View</button></td>
                                          
                                           
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