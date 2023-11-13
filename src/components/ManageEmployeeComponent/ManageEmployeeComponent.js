import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ManageEmployeeService from '../../services/ManageEmployeeService';


export default function ManageEmployeeComponent(){
    

    const [kppResponses, setKppResponses] = useState([])

    useEffect(() => {
        ManageEmployeeService.getKPPDetails().then((res) => {
            setKppResponses(res.data);
           
        });
    }, []);

    return(
        <div className='container-fluid'>
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
                                 
                                kppResponses.map(
                                    
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">

                                            <td>{index+1}</td>
                                            <td>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                           <td>
                                            <input type="text" className="form-control" id="deptName" placeholder="Achived Weightage"/>
                                       </td>
                                       <td>
                                            <input type="text" className="form-control" id="deptName" placeholder="Over All Achive"/>
                                       </td>
                                       <td>
                                            <input type="text" className="form-control" id="deptName" placeholder="Overall Weightage"/>
                                       </td>
                                        
                                            <td>{kppResponse.kppOverallWeightage}</td>
                                            <td>
                                            <input type="file" className="form-control" id="deptName"/>
                                       </td>
                                           
                                        </tr>
                                )
                               

                            }
                          
                        </tbody>
                    </table>

                    </form>
                    
                </div>
               <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2"><button type="submit" className="btn btn-success "> Submit</button>
               
                </div>
               </div>
      </div>
 

    );
}