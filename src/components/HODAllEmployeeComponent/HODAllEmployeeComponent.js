import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EmployeeService from "../../services/EmployeeService";
export default function HODAllEmployeeComponent() {
    const navigate = useNavigate();


    const [companyId, setCompanyId] = useState('');
    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [reportingEmpId, setReportingEmpId] = useState('');
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [empFirstName, setEmpFirstName] = useState('');
    const [empMiddleName, setEmpMiddleName] = useState('');
    const [empLastName, setEmpLastName] = useState('');
    const [empDob, setEmpDob] = useState('');
    const [empPhoto, setEmpPhoto] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');
    const [empEmerMobileNo, setEmpEmerMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [empGender, setEmpGender] = useState('Male');
    const [empBloodgroup, setEmpBloodgroup] = useState('A+');
    const [remark, setRemark] = useState('');
    const [empTypeId, setEmpTypeId] = useState('');

const[empFirstNameSearch, setEmpFirstNameSearch] = useState();
    const [compnays, setCompanys] = useState([])
    const [regions, setRegions] = useState([])
    const [sites, setSites] = useState([])
    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])

    const [departments, setDepartments] = useState([])

    const [designations, setDesignations] = useState([])
    const [isSuccess, setIsSuccess] = useState(true)
    const [empEIdSearch, setEmpEIdSearch] = useState('');
    const [empTypes, setEmpTypes] = useState([])
    //for gender selection
    const onGenderChangeHandler = (event) => {
        setEmpGender(event);
    };

    //for blood group selection
    const onBloodGroupChangeHandler = (event) => {
        setEmpBloodgroup(event);
    };



    useEffect(() => {
        EmployeeService.getEmployeeDetailsByPaging().then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
          
        });



    }, []);;

    

    
    const showEmployeeById = (e) => {

        EmployeeService.getEmployeeById(e).then(res => {
            let employee = res.data;
            console.log(employee)
            setEmpId(employee.empId)
            setEmpEId(employee.empEId)
            setRoleId(employee.roleId)
            setRoleName(employee.roleName)
            setDeptId(employee.deptId)
            setDeptName(employee.deptName)
            setDesigId(employee.desigId)
            setDesigName(employee.desigName)
            setReportingEmpId(employee.reportingEmpId)
            setRegionId(employee.regionId)
            setRegionName(employee.regionName)
            setSiteId(employee.siteId)
            setSiteName(employee.siteName)
            setEmpFirstName(employee.empFirstName)
            setEmpMiddleName(employee.empMiddleName)
            setEmpLastName(employee.empLastName)
            setEmpDob(employee.empDob)
            setEmpPhoto(employee.empPhoto)
            setEmpMobileNo(employee.empMobileNo)
            setEmpEmerMobileNo(employee.empEmerMobileNo)
            setEmailId(employee.emailId)
            setTempAddress(employee.tempAddress)
            setPermAddress(employee.permAddress)
            setEmpGender(employee.empGender)
            setEmpBloodgroup(employee.empBloodgroup)
            setRemark(employee.remark)
        }
        );
        // window.location.reload(); 
    }



    return (


        <div className="row">
            <h2 className="text-center">Employee List</h2>
            <div className="col-md-1"></div>
            <div className="col-md-10">
            
                <div className="row">
                {isSuccess?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Sr No</th>
                                <th className="text-center">Employee Name</th>
                                <th className="text-center">Employee Id</th>

                                <th className="text-center">Department Name</th>
                                <th className="text-center">Desig   nation Name</th>
                                <th className="text-center">Role Name</th>
                                <th className="text-center">Mobile No</th>

                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    (employee, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={employee.empId}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-justify">{employee.empFirstName + ' ' + employee.empMiddleName + ' ' + employee.empLastName}</td>
                                            <td className="text-center">{employee.empEId}</td>

                                            <td className="text-center">{employee.deptName}</td>
                                            <td className="text-center">{employee.desigName}</td>
                                            <td className="text-center">{employee.roleName}</td>
                                            <td className="text-center">{employee.empMobileNo}</td>

                                            <td className="col-sm-3 text-center"> 
                                              
                                                <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showEmployee" onClick={() => showEmployeeById(employee.empId)}>View</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    :<h4>Employee Id is not available</h4>}
                </div>

            </div>
            <div className="col-md-1"></div>


            {/** Display Employee by Id */}
            <div className="modal fade" id="showEmployee" role="dialog">
                <div className="modal-dialog modal-lg">


                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">View Employee Details</h4>
                        </div>

                        <div className="modal-body">
                            <form className="form-horizontal" action="/action_page.php">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Role Name:</label>
                                        <div className="col-sm-3">
                                            {roleName}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                                        <div className="col-sm-3">
                                            {deptName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                                        <div className="col-sm-3">
                                            {desigName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                                        <div className="col-sm-9">
                                            {empFirstName + ' ' + empMiddleName + ' ' + empLastName}
                                        </div>


                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                                        <div className="col-sm-3">
                                            {empDob}

                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                                        <div className="col-sm-3">
                                            {empPhoto}
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                                        <div className="col-sm-3">
                                            {empMobileNo}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                                        <div className="col-sm-3">
                                            {empEmerMobileNo}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                                        <div className="col-sm-3">
                                            {tempAddress}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                                        <div className="col-sm-3">
                                            {permAddress}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                                        <div className="col-sm-4">
                                            {emailId}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                                        <div className="col-sm-3">
                                            {empGender}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                                        <div className="col-sm-3">
                                            {empBloodgroup}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            {remark}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal"> Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}