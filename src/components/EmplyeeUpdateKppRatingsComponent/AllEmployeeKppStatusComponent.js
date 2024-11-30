import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AllEmployeeKppStatusService from '../../services/AllEmployeeKppStatusService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function ManageEmployeeComponent() {

    const navigate = useNavigate();
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
        AllEmployeeKppStatusService.getEmployeeDetailsByPagination(data).then((res) => {
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

        AllEmployeeKppStatusService.getEmployeeByStatusByPagination(data).then((res) => {
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

    const navigateToUpdateRating = (empId) => {

        Cookies.set('empIdForKppRatings', empId);
        // navigate(`/updateEmployeeKpp/${empResponse.empId}`, { replace: true })
        navigate(`/updateEmployeeKpp`, { replace: true })
    }

    return (
        <div className='container'>
            <div className="row">

                <div className="form-group">

                    <div className="row">
                        <form className="form-horizontal">
                            <label className="control-label col-sm-2" htmlFor="empKppStatus">KPP Status:</label>
                            <div className="col-sm-3">
                                <select className="form-control" name="empKppStatus" id="empKppStatus" value={empKppStatus} onChange={(e) => onOptionChangeHandler(e.target.value)}  >
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Reject">Reject</option>
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
                                    <th className='text-center'>KPP Month</th>
                                    <th className='text-center'>Employee Name</th>
                                    <th className='text-center'>Employee Id</th>
                                    <th className='text-center'>Designation Name</th>
                                    <th className='text-center'>Mobile No</th>
                                    <th className='text-center'>Employee Ratings</th>
                                    <th className='text-center'>Hod Ratings</th>
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
                                                <td className='text-center'>{empResponse.ekppMonth}</td>
                                                <td>{empResponse.empFirstName + ' ' + empResponse.empMiddleName + ' ' + empResponse.empLastName}</td>
                                                <td className='text-center'>{empResponse.empEId}</td>
                                                <td className='text-center'>{empResponse.desigName}</td>
                                                <td className='text-center'>{empResponse.empMobileNo}</td>
                                                <td className='text-center'>{empResponse.empOverallAchive}</td>
                                                <td className='text-center'>{empResponse.hodOverallAchieve}</td>
                                                <td className='text-center'>{empResponse.hodKppStatus}</td>
                                                <td>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" disabled={empResponse.empEKppStatus === "Pending"} onClick={() => navigateToUpdateRating(empResponse.empId)} >View</button></td>
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
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}