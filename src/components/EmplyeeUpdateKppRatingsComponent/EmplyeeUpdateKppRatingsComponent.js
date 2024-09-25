import React, { useRef } from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';

import Cookies from 'js-cookie';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import { BASE_URL_API } from '../../services/URLConstants';

const EmplyeeUpdateKppRatingsComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [empName, setEmpName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigName, setDesigName] = useState('');

    const [hodTotalAchivedWeight, setHodTotalAchivedWeight] = useState('');
    const [hodTotalOverallAchieve, setHodTotalOverallAchieve] = useState('');
    const [hodTotalOverallTaskComp, setHodTotalOverallTaskComp] = useState('');

    const [hodRemark, setHodRemark] = useState('');
    const [hodKppStatus, setHodKppStatus] = useState('Approved');

    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }

       //for hod approved or reject status selection
       const onHodStatusChangeHandler = (event) => {
        setHodKppStatus(event);
    };

  
    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth)) 
            setEmpName(res.data.empName);
            setDeptName(res.data.deptName);
            setDesigName(res.data.desigName);
            
            setKppMasterResponses(res.data);
            setHodRemark(res.data.hodRemark)
            setKppDetailsResponses(res.data.kppStatusDetails)
        });
    }, []);

    const sumHodTotalAchivedWeight = (empKpps) => {

        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.hodAchivedWeight), 0);
        setHodTotalAchivedWeight(sum)
        return sum;
    }     

    const sumHodTotalOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.hodOverallAchieve), 0);
        const totalKpps=kppDetailsResponses?.length || 1;
        setHodTotalOverallAchieve((sum/totalKpps).toFixed(1))
        return (sum/totalKpps).toFixed(1);
    }
    const sumHodTotalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.hodOverallTaskComp), 0);
        const totalKpps=kppDetailsResponses?.length || 1;
        setHodTotalOverallTaskComp((sum/totalKpps).toFixed(1))
        return (sum/totalKpps).toFixed(1);
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalHodAchivedWeight: 0,
                    totalHodOverallAchieve: 0,
                    totalHodOverallTaskComp: 0
                }}
                    enableReinitialize={true}
                   
                    onSubmit={(values) => {
                        
                        
                        const payload = { "kppUpdateRequests": values?.fields, "hodTotalAchivedWeight": hodTotalAchivedWeight, "hodTotalOverallAchieve": hodTotalOverallAchieve, "hodTotalOverallTaskComp": hodTotalOverallTaskComp, hodKppStatus, hodRemark };
                        EmployeeKppsService.saveEmployeeKppRatingByHod(payload).then(res => {
                            alert("Employee KPP added");
                        });
                    }}>
                    {({ values, setFieldValue }) => {

                      console.log("values=", values.totalHodAchivedWeight)

                        const handleTodoChange = (e, i, kppId, kppOverallWeightage, hodOverallTaskComp, kppRating1) => {
                            console.log("e.target.value : ", e.target.value)
                            const field = e.target.name?.split(".")[1];
                            console.log("kppDetailsResponses[i].hodOverallTaskComp =", hodOverallTaskComp)

                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],


                                "kppId": kppId,
                                "empId": Cookies.get('empIdForKppRatings'),                               
                     
                                "hodOverallTaskComp": field === "hodOverallAchieve" && !!e.target.value ? (Number(e.target.value) / 5 * 100).toFixed(1) : 0,
                                "hodAchivedWeight": field === "hodOverallAchieve" && !!e.target.value ? ((kppOverallWeightage * (Number(e.target.value) / 5 * 100).toFixed(1)) / 100).toFixed(1) : 0,
                                "ekppMonth": ekppMonth,
                                [field]: parseInt(e.target.value || 0),
                            }
                            console.log("kppDetailsResponses = ", kppDetailsResponses)
                            setFieldValue("totalOverallTaskCompleted",sumHodTotalOverallTaskComp(kppDetailsResponses));
                            setFieldValue("totalOverAllAchive", sumHodTotalOverallAchieve(kppDetailsResponses));
                            setFieldValue("totalAchivedWeightage",sumHodTotalAchivedWeight(kppDetailsResponses));
                            setFieldValue("fields", kppDetailsResponses)
                        };
                        return (
                            <Form className="form-horizontal">

                            <div className="form-group">
                                    <label className="control-label col-sm-1"  >Name :</label>
                                    <div className="col-sm-2">
                                       {empName}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-1"  >Department :</label>
                                <div className="col-sm-2">
                                   {deptName}
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-1"  >Designation:</label>
                            <div className="col-sm-2">
                               {desigName}
                            </div>
                        </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1 "  >Kpp Added Date:</label>
                                    <div className="col-sm-2">
                                       {ekppMonth}
                                    </div>
                                </div>

                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                        <td colSpan={21} className="text-center"><b>EMPLOYEE-WISE KEY PERFORMANCE INDICATORS (KPIs)</b></td>
                                        </tr>
                                        <tr>
                                        <th rowSpan={2} className="text-center">Sr No</th>
                                        <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                        <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                        <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                        <th rowSpan={2} className="text-center">UOM</th>
                                        <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                        <th rowSpan={2} className="text-center">OVERALL ACHIEVEMENT</th>
                                        <th rowSpan={2} className="text-center">% OF TOTAL TASK COMPLETED</th>

                                        <th rowSpan={2} className="text-center">Hod Achived Weightage</th>
                                        <th rowSpan={2} className="text-center">Hod Ratings</th>
                                        <th rowSpan={2} className="text-center">Hod Overall Task Completed</th>
                                        <th rowSpan={2} className="text-center">GM Achived Weightage</th>
                                        <th rowSpan={2} className="text-center">GM Ratings</th>
                                        <th rowSpan={2} className="text-center">GM Overall Task Completed</th>
                                        <th colSpan={5} className="text-center">RATING RATIO COULD BE CHANGED AS PER TARGETS</th>
                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">ACHIEVED WEIGHTAGE IN % </th>                                           
                                            <th className="text-center">Rating 1</th>
                                            <th className="text-center">Rating 2</th>
                                            <th className="text-center">Rating 3</th>
                                            <th className="text-center">Rating 4</th>
                                            <th className="text-center">Rating 5</th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>
                                        {values?.fields?.map(
                                            (kppResponse, index) =>
                                                <tr key={kppResponse.kppId} className="text-justify">
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{kppResponse.kppObjective}</td>
                                                    <td>{kppResponse.kppPerformanceIndi}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                                    <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                                    <td>{kppResponse.uomName}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>
                                                   
                                                    <td className='text-center'>{kppResponse.empAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.empOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.empOverallTaskComp}</td>
                                                   
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.hodAchivedWeight`} value={values?.fields?.[index]?.hodAchivedWeight} disabled />
                                                    </td>

                                                    <td>
                                                        <input type="number" className="form-control"
                                                            name={`${index}.hodOverallAchieve`}
                                                            min={0}
                                                            max={5}
                                                            defaultValue={values?.fields?.[index]?.hodOverallAchieve}

                                                            onKeyDown={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.hodOverallTaskComp, kppResponse.kppRating1)}
                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.hodOverallTaskComp, kppResponse.kppRating1)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.hodOverallTaskComp`} value={values?.fields?.[index]?.hodOverallTaskComp} disabled />
                                                    </td>

                                                   
                                                    <td className='text-center'>{kppResponse.gmAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.gmOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.gmOverallTaskComp}</td>
                                                    <td className='text-center'>{kppResponse.kppRating1}</td>
                                                    <td className='text-center'>{kppResponse.kppRating2}</td>
                                                    <td className='text-center'>{kppResponse.kppRating3}</td>
                                                    <td className='text-center'>{kppResponse.kppRating4}</td>
                                                    <td className='text-center'>{kppResponse.kppRating5}</td>

                                                </tr>
                                        )}
                                        <tr className="text-justify">
                                            <td></td>
                                            <td></td>
                                            <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> </td>
                                            <td></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallTaskComp}</label></td>
                                           
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalHodAchivedWeight === 0 ? sumHodTotalAchivedWeight(values?.fields) : values?.totalHodAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalHodOverallAchieve === 0 ? sumHodTotalOverallAchieve(values?.fields) : values?.totalHodOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalHodOverallTaskComp === 0 ? sumHodTotalOverallTaskComp(values?.fields) : values?.totalHodOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallTaskComp}</label></td>

                                        </tr>
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">View Evidence:</label>
                                    <div className="col-sm-3">Download evidence 
                                    <a href={BASE_URL_API+`/evidence?empId=${Cookies.get('empIdForKppRatings')}`}>
                                    Click here</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="empRemark">Enter Remark:</label>
                                    <div className="col-sm-6">
                                        <textarea row="5" className="form-control" id="hodRemark" name="hodRemark" defaultValue={hodRemark} placeholder="Enter Remark here" onChange={(e) => setHodRemark(e.target.value)} />
                                    </div>
                                </div>
                    
                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="hodKppStatus">Hod Status:</label>
                                <div className="col-sm-2">
                                    <select className="form-control" id="hodKppStatus" onChange={(e) => onHodStatusChangeHandler(e.target.value)} defaultValue={hodKppStatus} >
                                        <option value="Approved">Approved</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </div>
                                </div>

                               

                               
                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success"> Submit</button>
                                       
                                    <a href={BASE_URL_API+`/report/in-progress-employee-kpp-status?empId=${Cookies.get('empIdForKppRatings')}`}>
                                    <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}> Download</button> </a>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    );
}
export default EmplyeeUpdateKppRatingsComponent;