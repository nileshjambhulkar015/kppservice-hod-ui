import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

import PaginationComponent from '../PaginationComponent/PaginationComponent';
import OverallEmployeeKppFeedbackService from '../../services/OverallEmployeeKppFeedbackService';


export default function AllEmployeeKppFeedbackStatusComponent() {

    const navigate = useNavigate();
    const { empId } = useParams();

    const [empKppStatus, setEmpKppStatus] = useState('In-Progress')
    const [empResponses, setEmpResponses] = useState([])

    const [isSuccess, setIsSuccess] = useState(true)
    const [responseMessage, setResponseMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dataPageable, setDataPageable] = useState([])

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Handle data fetching or any other logic here
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes
    };


    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        OverallEmployeeKppFeedbackService.getEmployeeKppDetailsByPagination(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
            setEmpResponses(res.data.responseData.content);
            setDataPageable(res.data.responseData);

        }
        else {
            setResponseMessage(res.data.responseMessage)
            setIsSuccess(false);
        }

        });
    }, [currentPage, itemsPerPage]);

    const onOptionChangeHandler = (event) => {
       
        setEmpKppStatus(event);
    };

    const searchByEKpp = (e) => {
        const data = {
            currentPage,
            itemsPerPage,
            empKppStatus
        }
        OverallEmployeeKppFeedbackService.searchEmployeeKppDetailsByPagination(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
           
            setEmpResponses(res.data.responseData.content);
            setDataPageable(res.data.responseData);

        }
        else {
            setResponseMessage(res.data.responseMessage)
            setIsSuccess(false);
        }
            
        }, [currentPage, itemsPerPage]);
    }

    const completeEmpKpp = (e) => {
        OverallEmployeeKppFeedbackService.completeEmpKppGM(e).then(res => {
            
        }
        );
    }

    const navigateToUpdateRating=(empId,empEId,roleId,deptId,desigId,finYear)=>{
       
        Cookies.set('empIdForKppFeedback', empId);
        Cookies.set('empEIdForKppFeedback', empEId);
        Cookies.set('empFinYearForKppFeedback', finYear);
        Cookies.set('empRoleIdForKppFeedback', roleId);
        Cookies.set('empDeptIdForKppFeedback', deptId);
        Cookies.set('empDesigIdForKppFeedback', desigId);

        navigate(`/overallemployeekppfeedback`, { replace: true })    
        
    } 

    return (
        <div className='container-fluid'>
            <div className="row">
          
                <div className="form-group">
                
                    <div className="row">
                    <form className="form-horizontal">
                        <label className="control-label col-sm-2" htmlFor="empKppStatus">KPP Status:</label>
                        <div className="col-sm-2">
                            <select className="form-control" name="empKppStatus" id="empKppStatus"   onChange={(e)=>onOptionChangeHandler(e.target.value)} defaultValue={empKppStatus} >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Approved">Approved</option>
                                
                            </select>  
                        </div>
                        </form>
                        <button type="submit" className="btn btn-success" onClick={(e) => searchByEKpp(e)} > Submit</button>
                    </div>
                </div>

                <form className="form-horizontal">
                {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center'>Sr No</th>
                                <th className='text-center'>KPP Year</th>
                                <th className='text-center'>Employee Name</th>
                                <th className='text-center'>Employee Id</th>
                                <th className='text-center'>Department Name</th>
                                <th className='text-center'>Designation Name</th>
                                <th className='text-center'>Hod Ratings</th>
                                <th className='text-center'>GM Ratings</th>
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
                                            <td className='text-center'>{empResponse.finYear}</td>
                                            <td>{empResponse.empName}</td>
                                            <td className='text-center'>{empResponse.empEId}</td>
                                            <td className='text-center'>{empResponse.deptName}</td>
                                            <td className='text-center'>{empResponse.desigName}</td>
                                            <td className='text-center'>{empResponse.totalEmpOverallAchieve}</td>
                                            <td className='text-center'>{empResponse.totalGmOverallAchieve}</td>
                                            <td className='text-center'>{empResponse.gmKppStatus}</td>
                                            <td>
                                                <button type="submit" className="btn col-sm-offset-1 btn-success" disabled={empResponse.empEKppStatus=="Pending"} onClick={() => navigateToUpdateRating(empResponse.empId,empResponse.empEId,empResponse.roleId,empResponse.deptId,empResponse.desigId,empResponse.finYear)}>View</button>                                  
                                                <button type="submit" className="btn col-sm-offset-1 btn-success" disabled={empResponse.gmKppStatus === "Pending" || empResponse.gmKppStatus !== "Approved"}  onClick={() => completeEmpKpp(empResponse.empId)} >Finish</button>
                                                </td>      
                                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                    : <h4>{responseMessage}</h4>}
                    { empResponses?.length>0 && (
                    <PaginationComponent 
                        currentPage={currentPage}
                        totalPages={dataPageable.totalPages || 10}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                  
                    />
                )}

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