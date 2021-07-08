import React from 'react';
import './employee.scss';
import deleteIcon from '../../assets/outline_remove_circle_black_24dp.png';
import editIcon from '../../assets/outline_edit_black_24dp.png';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse -4.png';
import profile3 from '../../assets/profile-images/Ellipse -5.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import profile5 from '../../assets/profile-images/Ellipse -2.png';
import profile6 from '../../assets/profile-images/Ellipse -1.png';
import { withRouter } from 'react-router-dom';
const EmployeeList = (props) => {
    return (
        <table id="display" className="table">
            <tbody>

                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((employee) => (
                        <tr key={employee.id}>
                            <td><img src={handleProfilePicture(employee.profilePicture)} alt="" /></td>
                            <td>{employee.name}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.departments.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                            <td> ₹ {employee.salary}</td>
                            <td>{stringifyDate(employee.startDate)}</td>
                            <td><img src={deleteIcon}  alt="delete" />
                                <img src={editIcon}  alt="edit" /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const profiles = ["../../assets/profile/Ellipse -3.png", "../../assets/profile/Ellipse -4.png",
    "../../assets/profile/Ellipse -5.png", "../../assets/profile/Ellipse -7.png"];

const handleProfilePicture = (profilePicturePath) => {
    let index;
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i] === profilePicturePath) {
            index = i;
        }
    }
    switch (index) {
        case 0: return profile1;
        case 1: return profile2;
        case 2: return profile3;
        case 3: return profile4;
        case 4: return profile5;
        case 5 : return profile6;
        default: return null;

    }
}

export default withRouter(EmployeeList);