import React from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';
import { BASE_URL_API } from '../../services/URLConstants';
import FinancialYearService from '../../services/FinancialYearService';

const OverallRemarkHodKppRatingsComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [empRemark, setEmpRemark] = useState('');
    const [finYearId, setFinYearId] = useState('');
    const [finYear, setFinYear] = useState('');

    const [totalAchivedWeight, setTotalAchivedWeight] = useState('');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('');
    const [totalOverallTaskComp, setTotalOverallTaskComp] = useState('');
    const[evidenceFileName, setEvidenceFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])
    const [totalOverallRatings, setTotalOverallRatings] = useState();
    const [totalOverallPercentage, setTotalOverallPercentage] = useState();

    const [financialYears, setFinancialYears] = useState([])

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }



    const sumTotalAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.empAchivedWeight), 0).toFixed(1);
        setTotalAchivedWeight(sum)
        return sum;
    }


    const getAvgTotalOverallRatings = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.overallRatings || 0), 0).toFixed(1);
        const totalKpps=kppDetailsResponses?.length || 1;
        setTotalOverallRatings((sum/totalKpps).toFixed(1))
        return (sum/totalKpps).toFixed(1);
    }

    const getAvgTotalOverallPercetage = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.overallPercentage || 0), 0).toFixed(1);
        const totalKpps=kppDetailsResponses?.length || 1;
        setTotalOverallPercentage((sum/totalKpps).toFixed(1))
        return (sum/totalKpps).toFixed(1);
    }


    const sumTotalOverAllAchive = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.empOverallAchieve), 0);
        const totalKpps=kppDetailsResponses?.length || 1;
        setTotalOverAllAchive((sum/totalKpps).toFixed(1))
        return (sum).toFixed(1);
        //return (sum/totalKpps).toFixed(1);
    }
    const sumTotalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.empOverallTaskComp), 0);
        const totalKpps=kppDetailsResponses?.length || 1;
        setTotalOverallTaskComp((sum/totalKpps).toFixed(1))
        return (sum).toFixed(1);
        //return (sum/totalKpps).toFixed(1);
    }

    useEffect(() => {

        FinancialYearService.ddAllFinancialYear().then((res) => {
            setFinancialYears(res.data);
            setFinYearId(res.data?.[0].finYearId)
        });

        FinancialYearService.getFinancialYearById(1).then((res) => {
            setFinYear(res.data.finYear)
        });
     
        EmployeeKppsService.getHODKPPDetailsYearly().then((res) => {
           
            if(null !=res.data.ekppMonth){
                setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
             } else{
                const newDate = new Date();           
                // Format to YYYY-MM-DD
                const formattedDate = newDate.toISOString().split('T')[0];            
                setEkppMonth(formattedDate);



               
             }         
            setKppMasterResponses(res.data);
            setEmpRemark(res.data.empRemark)
            setKppDetailsResponses(res.data.kppStatusDetails)
        });

        EmployeeKppsService.getEvidenceFileDetails(ekppMonth).then((res) => {
         
            setEvidenceFileName(res.data.responseData.evFileName);
         
        });
    }, []);

    const selectFile =  (e) => {
        setSelectedFile(e.target.files[0]);
     }
     const uploadFile =  (e) => {
        
         if (selectedFile) {
           let data = new FormData();
           data.append('multipartFile', selectedFile);
           data.append('empId',Cookies.get('empId'))
           data.append('evMonth', ekppMonth)
           EmployeeKppsService.uploadEvidence(data).then((res)=>{
             if(res.data.success){
                 alert(res.data.responseMessage)
                 EmployeeKppsService.getEvidenceFileDetails(ekppMonth).then((res) => {
          
                     setEvidenceFileName(res.data.responseData.evFileName);
                  
                 });
                
             } else {
                 alert(res.data.responseMessage)
             }
 
           });
           // axios.post('http://localhost:9091/evidence', data);
         }
     }
 
     const deleteFile =  (ekppMonth) => {
           EmployeeKppsService.deleteEvidence(ekppMonth).then((res)=>{
             if(res.data.success){
                 alert(res.data.responseMessage)
             } else {
                 alert(res.data.responseMessage)
             }
           });      
         
     }
   

    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalAchivedWeightage: 0,
                    totalOverAllAchive: 0,
                    totalOverallTaskCompleted: 0,
                    totalOverallRatings: 0,
                    totalOverallPercentage: 0,
        
                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        let ekppStatus = "In-Progress";
                        let evidence = "evidence";
                        const payload = { "kppUpdateRequests": values?.fields, "totalAchivedWeightage": totalAchivedWeight, "totalOverAllAchive": totalOverAllAchive, "totalOverallTaskCompleted": totalOverallTaskComp, "totalOverallRatings":totalOverallRatings,"totalOverallPercentage":totalOverallPercentage,ekppMonth, ekppStatus, empRemark, evidence };
                        EmployeeKppsService.saveEmployeeKppDetails(payload).then(res => {
                            if (res.data.success) {
                                alert(res.data.responseMessage);
                              //  EmployeeKppsService.getKPPDetails().then((res) => {
                                EmployeeKppsService.getHODKPPDetails().then((res) => {
                                    setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
                                    setKppMasterResponses(res.data);
                                    setEmpRemark(res.data.empRemark)
                                    setKppDetailsResponses(res.data.kppStatusDetails)
                                });
                            } else{
                                alert(res.data.responseMessage);
                            }});
                          
                      
                    }}>
                    {({ values, setFieldValue }) => {
                        const handleTodoChange = (e, i, kppId, kppOverallWeightage, gmOverallAchieve) => {
                        
                            
                            const field = e.target.name?.split(".")[1];
                            

                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],


                                "kppId": kppId,
                                "empId": Cookies.get('empId'),
                                "empEId": Cookies.get('empEId'),
                                "roleId": Cookies.get('roleId'),
                                "deptId": Cookies.get('deptId'),
                                "desigId": Cookies.get('desigId'),
                                "empOverallTaskComp": field === "empOverallAchieve" && !!e.target.value ? (Number(e.target.value) / 5 * 100).toFixed(1) : 0,
                                "empAchivedWeight": field === "empOverallAchieve" && !!e.target.value ? ((kppOverallWeightage * (Number(e.target.value) / 5 * 100).toFixed(1)) / 100).toFixed(1) : 0,
                                "overallRatings": field === "empOverallAchieve" && !!e.target.value ?  ((Number(gmOverallAchieve)+(Number(e.target.value)))  / 2).toFixed(1) : 0,
                                "overallPercentage": field === "empOverallAchieve" && !!e.target.value ? ((((Number(gmOverallAchieve)+(Number(e.target.value)))  / 2)/5)*100).toFixed(1) : 0,
                                

                                "ekppMonth": ekppMonth,
                                [field]: parseInt(e.target.value || 0),
                            }
                            setFieldValue("totalAchivedWeightage", sumTotalAchivedWeight(kppDetailsResponses));
                            setFieldValue("totalOverAllAchive", sumTotalOverAllAchive(kppDetailsResponses));
                            setFieldValue("totalOverallTaskCompleted", sumTotalOverallTaskComp(kppDetailsResponses));

                            setFieldValue("totalOverallRatings", getAvgTotalOverallRatings(kppDetailsResponses));
                            setFieldValue("totalOverallPercentage", getAvgTotalOverallPercetage(kppDetailsResponses));
                           

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
                                            <td colSpan={21} className="text-center"><h3>HOD KEY PERFORMANCE INDICATORS (KPIs) for financial Year {finYear}</h3></td>
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
                                                    <textarea rows="5" className="form-control" id="empRemark" name="empRemark" defaultValue={empRemark} placeholder="Enter Remark here" onChange={(e) => setEmpRemark(e.target.value)} />
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
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalAchivedWeightage === 0 ? sumTotalAchivedWeight(values?.fields) : values?.totalAchivedWeightage}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverAllAchive === 0 ? sumTotalOverAllAchive(values?.fields) : values?.totalOverAllAchive}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverallTaskCompleted === 0 ? sumTotalOverallTaskComp(values?.fields) : values?.totalOverallTaskCompleted}</label></td>

                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallTaskComp}</label></td>
                                            
                                        </tr>
                                    </tbody>
                                </table>

                             
                                
                             
                            

                               


                               

                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success"> Submit</button>
                                    <a href={BASE_URL_API+`/report/in-progress-hod-kpp-status?empId=${Cookies.get('empId')}`}>
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