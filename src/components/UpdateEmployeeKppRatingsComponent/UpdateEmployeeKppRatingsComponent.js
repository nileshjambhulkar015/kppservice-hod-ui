import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import UpdateEmployeeKppRatingsService from '../../services/UpdateEmployeeKppRatingsService';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function UpdateEmployeeKppRatingsComponent() {
    const navigate = useNavigate();
    
   const {empId}=useParams();
console.log("psram empId=", empId)

    const [ekppMonth, setEkppMonth] = useState('');
    const [totalAchivedWeightage, setTotalAchivedWeightage] = useState('0');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('0');
    const [totalOverallTaskCompleted, setTotalOverallTaskCompleted] = useState('0');
    const [ekppStatus, setEkppStatus] = useState('');
    const [remark, setRemark] = useState('');
    const [evidence, setEvidence] = useState('');
    const [empKppStatus, setEmpKppStatus] = useState('Approved')

    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])
    const [employeeKpps, setEmployeeKpps] = useState([{ kppId: "",empId:"",empEId: "", roleId: "", deptId: "", desigId: "", ekppAchivedWeight: "", ekppOverallAchieve: "", ekppOverallTaskComp: "",ekkpMonth:"" }]);
   
    useEffect(() => {
        console.log("empId=", empId)
        UpdateEmployeeKppRatingsService.getKPPDetails(empId).then((res) => {
            
            setKppMasterResponses(res.data);
           
            setKppDetailsResponses(res.data.kppStatusDetails)
        });
    }, [empId]);

    const onOptionChangeHandler = (event) => {
        console.log("event=", event)
        setEmpKppStatus(event);
    };


    const totalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallTaskComp, 0);
        setTotalAchivedWeightage(sum)
    }

    const totalOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallAchieve, 0);
        setTotalOverAllAchive(sum)
    }

    const totalAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppAchivedWeight, 0);
        setTotalOverallTaskCompleted(sum)
    }

    const handleTodoChange = (e, i, kppId, kppOverallTarget) => {
        const field = e.target.name;
        const empKpps = [...employeeKpps];

        empKpps[i] = {
            ...empKpps[i],
            "kppId": kppId,
            "empId": empId,
           /* "empEId": Cookies.get('empEId'),
            "roleId": Cookies.get('roleId'),
            "deptId": Cookies.get('deptId'),
            "desigId": Cookies.get('desigId'),*/
           // "ekppStatus": "Pending",  // NEED TO MAKE IT DYNAMIC
            "ekppOverallTaskComp": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppAchivedWeight": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekkpMonth":ekppMonth,
            [field]: e.target.value || 0,
        }
        totalOverallTaskComp(empKpps)
        totalOverallAchieve(empKpps)
        totalAchivedWeight(empKpps)
        setEmployeeKpps(empKpps);
    };   

  
    const saveEmployeeKpp = (e) => {
        e.preventDefault()
        let ekppStatus = empKppStatus;
       
        /*let totalAchivedWeightage="totalAchivedWeightage";
        let totalOverAllAchive="totalOverAllAchive";
        let totalOverallTaskCompleted="totalOverallTaskCompleted";
         
         let remark="remark";
         let evidence="evidence";*/
        const payLoad = { "kppUpdateRequests": employeeKpps, totalAchivedWeightage, totalOverAllAchive, totalOverallTaskCompleted, ekppStatus, remark };
        console.log(payLoad)
        UpdateEmployeeKppRatingsService.updateEmpArroveOrRejectByHod(payLoad).then(res => {
            navigate(`/allEmployeeKppStatus`, { replace: true })
        }
        );
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
            <form className="form-horizontal">
            <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Employee Name:</label>
                       <div>{kppMasterResponses?.[0]?.empName}</div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Employee Id:</label>
                       <div>{kppMasterResponses?.[0]?.empEId}</div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Designantion:</label>
                       <div>{kppMasterResponses?.[0]?.desigName}</div>
                    </div>        
                    </form>
            </div>
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
                                <th>Employee Over All Achive</th>
                                <th>Employee Achived Weightage</th>
                              
                                <th>Employee Overall Task Completed</th>
                                <th>Overall Weightage</th>
                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>

                             
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kppDetailsResponses.map(
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">
                                           <td>{index + 1}</td>
                                            <td className='col-md-2'>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>{kppResponse.empAchivedWeight}</td>
                                            <td>{kppResponse.empOverallAchieve}</td>    
                                            <td>{kppResponse.empOverallTaskComp}</td>
                                            <td>{kppResponse.kppOverallWeightage}</td>

                                            <td>
                                                <input type="text" className="form-control" name="ekppAchivedWeight" defaultValue={kppResponse.hodAchivedWeight}  disabled />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" min="0" name="ekppOverallAchieve" defaultValue={kppResponse.hodOverallAchieve} onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallTarget)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallTaskComp" defaultValue={kppResponse.hodOverallTaskComp} disabled />
                                            </td>


                                         
                                        </tr>
                                )
                            }
                            <tr className="text-justify">
                                <td></td>
                                <td></td>
                                <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> </td>
                                <td></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}></label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}></label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}></label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}>{totalAchivedWeightage}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}>{totalOverAllAchive}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}>{totalOverallTaskCompleted}</label></td>

                            </tr>
                        </tbody>
                    </table>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">View Evidence:</label>
                        <div className="col-sm-3">
                            click here..
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                        <div className="col-sm-6">
                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">Kpp Status:</label>
                        <div className="col-sm-3">
                        <select className="form-control" name="empKppStatus" id="empKppStatus"  value={empKppStatus} onChange={(e)=>onOptionChangeHandler(e.target.value)} defaultValue={empKppStatus} >
                            <option value="Approved">Approved</option>
                            <option value="Reject">Reject</option>
                        </select>  
                        </div>
                    </div>
                   
                    <div className="form-group">
                
         
            </div>
          
                </form>

            </div>
            <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-4"><button type="submit" className="btn btn-success col-sm-offset-1" onClick={(e) => saveEmployeeKpp(e)} > Submit</button>
                    <button type="submit" className="btn btn-info col-sm-offset-1 "  onClick={() => navigate(`/allEmployeeKppStatus`, { replace: true })}> Back</button>
                 

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

                                kppDetailsResponses.map(
                                    (kppResponse, index) =>

                                        <tr className="text-center">

                                            <td>{index + 1}</td>
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