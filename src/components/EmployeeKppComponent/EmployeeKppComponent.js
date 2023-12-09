import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import EmployeeKppService from '../../services/EmployeeKppService';


export default function EmployeeKppComponent() {
    const [kppEmpStatus, setKppEmpStatus] = useState('Male');
    const [remark, setRemark] = useState('');
    const [kppResponses, setKppResponses] = useState([])
    const [todos, setTodos] = useState([{ kppId: "", empId: "", empEId: "", roleId: "", deptId: "", desigId: "", ekppAchivedWeight: "", ekppOverallAchieve: "", ekppOverallTaskComp: "", ekppAppliedDate: "", ekppEvidence: "", ekppStatus: "Pending" }]);
    useEffect(() => {
        EmployeeKppService.getKPPDetails().then((res) => {
            setKppResponses(res.data);

        });
    }, []);

    const handleTodoChange = (e, i, kppId, kppOverallTarget) => {
        const field = e.target.name;
        const newTodos = [...todos];

        newTodos[i] = {
            ...newTodos[i],
            "kppId": kppId,
            "empId": Cookies.get('empId'),
            "empEId": Cookies.get('empEId'),
            "roleId": Cookies.get('roleId'),
            "deptId": Cookies.get('deptId'),
            "desigId": Cookies.get('desigId'),
            "ekppStatus": "Pending",  // NEED TO MAKE IT DYNAMIC
            "ekppOverallTaskComp": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppAchivedWeight": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            [field]: e.target.value || 0,
        }
        setTodos(newTodos);
    };

    const saveEmployeeKpp = (e) => {
        e.preventDefault()

        EmployeeKppService.saveEmployeeKppDetails(todos).then(res => {
            console.log("KPP added");
        }
        );
    }

    return (
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
                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                kppResponses.map(

                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">

                                            <td>{index + 1}</td>
                                            <td className='col-md-2'>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>{kppResponse.ekppAchivedWeight}</td>
                                            <td>{kppResponse.ekppOverallAchieve}</td>
                                            <td>{kppResponse.ekppOverallTaskComp}</td>
                                            <td>{kppResponse.kppOverallWeightage}</td>

                                            <td>
                                                <input type="text" className="form-control" name="ekppAchivedWeight" defaultValue={0} value={todos[index]?.ekppAchivedWeight} disabled />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" name="ekppOverallAchieve" defaultValue={0} onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallTarget)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallTaskComp" defaultValue={0} value={todos[index]?.ekppOverallTaskComp} disabled />
                                            </td>
                                        </tr>
                                )

                            }
                        </tbody>
                    </table>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">Upload Evidence:</label>
                        <div className="col-sm-3">
                            <input type="file" className="form-control" id="deptName" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                        <div className="col-sm-6">
                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-4" htmlFor="kppEmpStatus">Status:</label>
                                        <div className="col-sm-3">
                                            <select className="form-control" id="kppEmpStatus" onChange={(e) => setKppEmpStatus(e.target.value)} value={kppEmpStatus} >
                                                <option value={'Approve'}>Approve</option>
                                                <option value={'Reject'}>Reject</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                </form>

            </div>
            <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-4"><button type="submit" className="btn btn-success col-sm-offset-1" > Submit</button>
                    <button type="submit" className="btn btn-info col-sm-offset-1 "> Back</button>
                 

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