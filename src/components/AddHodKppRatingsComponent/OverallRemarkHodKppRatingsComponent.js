import React from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';
import { BASE_URL_API } from '../../services/URLConstants';
import FinancialYearService from '../../services/FinancialYearService';
import FreezeCumulativeService from '../../services/FreezeCumulativeService';

const OverallRemarkHodKppRatingsComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [empRemark, setEmpRemark] = useState('');
    const [finYearId, setFinYearId] = useState('');
    const [finYear, setFinYear] = useState('');

    const [totalEmpAchivedWeight, setTotalEmpAchivedWeight] = useState('');
    const [totalEmpOverallAchieve, setTotalEmpOverallAchieve] = useState('');
    const [totalEmpOverallTaskComp, setTotalEmpOverallTaskComp] = useState('');


    const [hodEmpId, setHodEmpId] = useState('');
    const [totalHodAchivedWeight, setTotalHodAchivedWeight] = useState('');
    const [totalHodOverallAchieve, setTotalHodOverallAchieve] = useState('');
    const [totalHodOverallTaskComp, setTotalHodOverallTaskComp] = useState('');


    const [gmEmpId, setGmEmpId] = useState('');
    const [totalGmAchivedWeight, setTotalGmAchivedWeight] = useState('');
    const [totalGmOverallAchieve, setTotalGmOverallAchieve] = useState('');
    const [totalGmOverallTaskComp, setTotalGmOverallTaskComp] = useState('');

    const [totalOverallRatings, setTotalOverallRatings] = useState();
    const [totalOverallPercentage, setTotalOverallPercentage] = useState();

    const [empKppFeedback, setEmpKppFeedback] = useState();

    const [totalAchivedWeight, setTotalAchivedWeight] = useState('');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('');
    const [totalOverallTaskComp, setTotalOverallTaskComp] = useState('');
    const [evidenceFileName, setEvidenceFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])


    const [financialYears, setFinancialYears] = useState([])

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }

    useEffect(() => {



        FinancialYearService.ddAllFinancialYear().then((res) => {
            setFinancialYears(res.data);
            setFinYearId(res.data?.[0].finYearId)
            Cookies.set('finYear', res.data?.[0].finYear);
        });

        FinancialYearService.getFinancialYearById(1).then((res) => {
            setFinYear(res.data.finYear)
            Cookies.set('finYear', res.data.finYear);
        });

        EmployeeKppsService.getHODKPPDetailsYearly().then((res) => {

            if (null != res.data.ekppMonth) {
                setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
            } else {
                const newDate = new Date();
                // Format to YYYY-MM-DD
                const formattedDate = newDate.toISOString().split('T')[0];
                setEkppMonth(formattedDate);




            }
            setTotalEmpAchivedWeight(res.data.totalEmpAchivedWeight)
            setTotalEmpOverallAchieve(res.data.totalEmpOverallAchieve)
            setTotalEmpOverallTaskComp(res.data.totalEmpOverallTaskComp)

            setHodEmpId(res.data.hodEmpId)
            setTotalHodAchivedWeight(res.data.totalHodAchivedWeight)
            setTotalHodOverallAchieve(res.data.totalHodOverallAchieve)
            setTotalHodOverallTaskComp(res.data.totalHodOverallTaskComp)

            setGmEmpId(res.data.gmEmpId)
            setTotalGmAchivedWeight(res.data.totalGmAchivedWeight)
            setTotalGmOverallAchieve(res.data.totalGmOverallAchieve)
            setTotalGmOverallTaskComp(res.data.totalGmOverallTaskComp)

            //average % need to be set
            setTotalOverallRatings(res.data.totalOverallRatings)
            setTotalOverallPercentage(res.data.totalOverallPercentage)
            setEmpRemark(res.data.empRemark)

            setKppMasterResponses(res.data.responseData);
            setKppDetailsResponses(res.data.responseData.kppStatusDetails)
        });

        EmployeeKppsService.getEvidenceFileDetails(ekppMonth).then((res) => {

            setEvidenceFileName(res.data.responseData.evFileName);

        });
    }, []);





    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalEmpAchivedWeight: 0,  //want to set value for this
                    totalEmpOverallAchieve: 0,
                    totalEmpOverallTaskComp: 0,
                    totalOverallRatings: 0,
                    totalOverallPercentage: 0
    
                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        let ekppStatus = "In-Progress";
                        let evidence = "evidence added";
                        let empId = Cookies.get('empId');
                        let empEId = Cookies.get('empEId');
                        let roleId = Cookies.get('roleId');
                        let deptId = Cookies.get('deptId');
                        let desigId = Cookies.get('desigId');  
                    

                        const payload = { "kppUpdateRequests": values?.fields, "finYear": finYear, "empId": empId, "empEId": empEId, "roleId": roleId, "deptId": deptId, "desigId": desigId, "totalEmpAchivedWeight": totalEmpAchivedWeight, "totalEmpOverallAchieve": totalEmpOverallAchieve, "totalEmpOverallTaskComp": totalEmpOverallTaskComp, "hodEmpId": hodEmpId, "totalHodAchivedWeight": totalHodAchivedWeight, "totalHodOverallAchieve": totalHodOverallAchieve, "totalHodOverallTaskComp": totalHodOverallTaskComp, "gmEmpId": gmEmpId, "totalGmAchivedWeight": totalGmAchivedWeight, "totalGmOverallAchieve": totalGmOverallAchieve, "totalGmOverallTaskComp": totalGmOverallTaskComp, "avgTotalOverallRating": totalOverallRatings, "avgTotalOverallPer": totalOverallPercentage, ekppMonth, ekppStatus, empRemark, evidence };


                        FreezeCumulativeService.saveEmployeeKppFeedbackDetails(payload).then(res => {
                            if (res.data.success) {
                                alert(res.data.responseMessage);
                                //  EmployeeKppsService.getKPPDetails().then((res) => {
                                EmployeeKppsService.getHODKPPDetailsYearly().then((res) => {
                                    setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
                                    setKppMasterResponses(res.data);
                                    setEmpRemark(res.data.empRemark)
                                    setKppDetailsResponses(res.data.kppStatusDetails)
                                });
                            } else {
                                alert(res.data.responseMessage);
                            }
                        });


                    }}>
                    {({ values, setFieldValue }) => {
                        const handleTodoChange = (e, i, kppId, empKppFeedback) => {
                            const field = e.target.name?.split(".")[1];
                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],

                                "empKppFeedback": empKppFeedback,
                                [field]: e.target.value || '',

                            }

                            setFieldValue("fields", kppDetailsResponses)
                        };
                        return (
                            <Form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="deptName">Financial Year:</label>
                                    <div className="col-sm-2">
                                        <select className="form-control" id="deptId" onChange={(e) => setFinYearId(e.target.value)}>

                                            {
                                                financialYears.map(
                                                    financialYear =>
                                                        <option key={financialYear.finYearId} value={financialYear.finYearId}>{financialYear.finYear}</option>
                                                )
                                            };

                                        </select>
                                    </div>
                                </div>
                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                            <td colSpan={21} className="text-center"><h3>HOD KEY PERFORMANCE INDICATORS (KPIs) for FINANCIAL YEAR {finYear}</h3></td>
                                        </tr>
                                        <tr>
                                            <th rowSpan={2} className="text-center">Sr No</th>
                                            <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                            <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                            <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                            <th rowSpan={2} className="text-center">UOM</th>
                                            <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                            <th rowSpan={2} className="text-center">SELF APPRIASEE OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">SELF APPRIASEE % OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE ACHIEVED WEIGHTAGE IN % </th>
                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE % OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">Overall KPP Remark</th>

                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">SELF APPRIASEE ACHIEVED WEIGHTAGE IN % </th>

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
                                                    <td className='text-center'>{kppResponse.uomName}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>
                                                    <td className='text-center'>{kppResponse.empAchivedWeight} </td>
                                                    <td className='text-center'>  {kppResponse.empOverallAchieve}</td>
                                                    <td className='text-center'> {kppResponse.empOverallTaskComp}</td>

                                                    <td className='text-center'>{kppResponse.gmAchivedWeight} </td>
                                                    <td className='text-center'>  {kppResponse.gmOverallAchieve}</td>
                                                    <td className='text-center'> {kppResponse.gmOverallTaskComp}</td>

                                                    <td className='col-sm-4'>

                                                        <textarea rows="5" className="form-control"
                                                            name={`${index}.empKppFeedback`}

                                                            defaultValue={values?.fields?.[index]?.empKppFeedback}

                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.empKppFeedback)}
                                                        />

                                                    </td>




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
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallTaskComp}</label></td>

                                        </tr>
                                    </tbody>
                                </table>











                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success"> Submit</button>
                                        <a href={BASE_URL_API + `/report/in-progress-hod-kpp-status?empId=${Cookies.get('empId')}`}>
                                            <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}>  Download</button></a>
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
export default OverallRemarkHodKppRatingsComponent;