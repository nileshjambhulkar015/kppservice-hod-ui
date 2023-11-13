import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppService from '../../services/EmployeeKppService';


export default function EmployeeKppComponent(){
    

    const [kppResponses, setKppResponses] = useState([])

    useEffect(() => {
        EmployeeKppService.getKPPDetails().then((res) => {
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
                                <th>Objective</th>
                                <th>Key Performance Indicator</th>
                                <th>Overall Target</th>
                                <th>Target Period</th>
                                <th>UOM</th>

                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>
                                <th>Overall Weightage</th>
                                <th>View Evidence</th>
                                <th>Hod Ratings</th>
                               
                          
                            </tr>
                        </thead>
                        <tbody>
                       
                            {
                                 
                                kppResponses.map(
                                    
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">

                                            <td>{index+1}</td>
                                            <td className='col-md-2'>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                           <td>{kppResponse.ekppAchivedWeight}</td>
                                       <td>{kppResponse.ekppOverallAchieve}</td>
                                       <td>{kppResponse.ekppOverallTaskComp}</td>
                                      
                                        
                                            <td>{kppResponse.kppOverallWeightage}</td>
                                            <td>{kppResponse.ekppEvidence}</td>
                                            <td>
                                            <input type="text" className="form-control" id="hodRatings" placeholder="HOD Ratings"/>
                                       </td>
                                           
                                        </tr>
                                )
                               

                            }
                          
                        </tbody>
                    </table>

                    </form>
                    
                </div>
               <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-4"><button type="submit" className="btn btn-success col-sm-offset-1" > Accept</button>
                <button type="submit" className="btn btn-danger col-sm-offset-1 "> Reject</button>
                <button type="submit" className="btn btn-primary col-sm-offset-1"> Cancle</button>
               
                </div>
               </div>
               <div className="row">
             <h4>  *Note - Please refere the below table for ratings:</h4>
                <div className="col-sm-5">
                               <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Sr No</th>
                                <th>KPP Objective</th>
                                <th>Rating 1</th>
                                <th>Rating 2</th>
                                <th>Rating 3</th>
                                <th>Rating 4</th>
                                <th>Rating 5</th>                          
                            </tr>
                        </thead>
                        <tbody>
                       
                            {
                                 
                                kppResponses.map(
                                    (kppResponse,index) =>

                                        <tr className="text-center">

                                            <td>{index+1}</td>
                                            <td className="text-justify">{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppRating1}</td>
                                            <td>{kppResponse.kppRating2}</td>
                                            <td>{kppResponse.kppRating3}</td>
                                            <td>{kppResponse.kppRating4}</td>
                                            <td>{kppResponse.kppRating5}</td>
                                        </tr>
                                )
                               

                            }
                          
                        </tbody>
                        
                    </table>
</div></div>       </div>
 

    );
}