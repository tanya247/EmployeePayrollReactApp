import React, { useState, userEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse -4.png';
import profile3 from '../../assets/profile-images/Ellipse -5.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import profile5 from '../../assets/profile-images/Ellipse -2.png';
import profile6 from '../../assets/profile-images/Ellipse -1.png';
import '../payroll-form/payroll-form.scss';
import logo from '../../assets/logo.png';
import { userParams, Link, withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';

const initialState = {
  name: '',
  profilePicture: '',
  gender: '',
  departments: [],
  salary: 40000,
  day: '1',
  month: 'Jan',
  year: '2020',
  startDate: new Date("1 Jan 2020"),
  notes: '',

  id: '',
  isUpdate: false,
  isError: false,

  error: {
    department: '',
    name: '',
    gender: '',
    profilePicture: '',
    startDate: ''
  },
  valid: {
    department: '',
    name: '',
    gender: '',
    profilePicture: '',
    startDate: ''
  }
}
class PayrollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      profilePicture: '',
      gender: '',
      departments: [],
      salary: 40000,
      day: '1',
      month: 'Jan',
      year: '2020',
      startDate: new Date("1 Jan 2020"),
      notes: '',

      id: '',
      isUpdate: false,
      isError: false,

      error: {
        department: '',
        name: '',
        gender: '',
        profilePicture: '',
        startDate: ''
      },
      valid: {
        department: '',
        name: '',
        gender: '',
        profilePicture: '',
        startDate: ''
      }
    }
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.profileChangeHandler = this.profileChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
    this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
    this.dayChangeHandler = this.dayChangeHandler.bind(this);
    this.monthChangeHandler = this.monthChangeHandler.bind(this);
    this.yearChangeHandler = this.yearChangeHandler.bind(this);
    this.notesChangeHandler = this.notesChangeHandler.bind(this);
  }

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
    this.checkName(event.target.value);
  }
  profileChangeHandler = (event) => {
    this.setState({ profilePicture: event.target.value });
    this.checkProfilePicture(event.target.value);
  }
  genderChangeHandler = (event) => {
    this.setState({ gender: event.target.value });
    this.checkGender(event.target.value);
  }
  departmentChangeHandler = async (event) => {
    {
      if (event.target.checked) {
        await this.setState({ departments: this.state.departments.concat(event.target.value) });
      }
      if (!event.target.checked) {
        let index = 0;
        let array = this.state.departments;
        for (let i = 0; i < array.length; i++) {
          if (array[i] === event.target.value) {
            index = i;
          }
        }
        array.splice(index, 1);
        await this.setState({ departments: array });
      }
    }
    this.checkDepartment(this.state.departments);
  }
  salaryChangeHandler = (event) => {
    this.setState({ salary: event.target.value });
  }
  dayChangeHandler = (event) => {
    this.setState({ day: event.target.value });
    this.setStartDate(event.target.value, this.state.month, this.state.year);
  }
  monthChangeHandler = (event) => {
    this.setState({ month: event.target.value });
    this.setStartDate(this.state.day, event.target.value, this.state.year);
  }
  yearChangeHandler = (event) => {
    this.setState({ year: event.target.value });
    this.setStartDate(this.state.day, this.state.month, event.target.value);
  }
  notesChangeHandler = (event) => {
    this.setState({ notes: event.target.value });
  }

  setStartDate = (day, month, year) => {
    let startDateValue = new Date(`${day} ${month} ${year}`);
    this.setState({ startDate: startDateValue });
    this.checkStartDate(startDateValue);
  }

  initializeMessage = (field, errorMessage, validMessage) => {
    this.setState(previousState => ({
      error: {
        ...previousState.error,
        [field]: errorMessage
      }
    }));
    this.setState(previousState => ({
      valid: {
        ...previousState.valid,
        [field]: validMessage
      }
    }));
  }
  checkName = (nameValue) => {
    if (nameValue.length === 0) {
      this.initializeMessage('name', '', '');
    } else {
      const NAME_REGEX = RegExp("^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$");
      if (NAME_REGEX.test(nameValue)) {
        this.initializeMessage('name', '', '✓');
      } else {
        this.initializeMessage('name', 'Name is Invalid!', '');
      }
    }
  }
  checkProfilePicture = (profilePictureValue) => {
    if (profilePictureValue.length === 0) {
      this.initializeMessage('profilePicture', 'Profile Picture cannot be Blank!', '');
    } else {
      this.initializeMessage('profilePicture', '', '✓');
    }
  }
  checkStartDate = (startDateValue) => {
    let now = new Date();
    let difference = Math.abs(now.getTime() - startDateValue.getTime());
    if (startDateValue > now) {
      this.initializeMessage('startDate', 'Start Date is a Futute Date!', '');
    } else {
      this.initializeMessage('startDate', '', '✓');
    }
  }
  checkDepartment = (departmentsValue) => {
    if (departmentsValue.length === 0) {
      this.initializeMessage('department', 'Employee must belong to atleast one Department!', '');
    } else {
      this.initializeMessage('department', '', '✓');
    }
  }
  checkGender = (genderValue) => {
    if (genderValue.length === 0) {
      this.initializeMessage('gender', 'Gender is a Required Field!', '');
    } else {
      this.initializeMessage('gender', '', '✓');
    }
  }
  checkGlobalError = () => {
    if (this.state.error.name.length === 0 && this.state.error.department.length === 0 && this.state.error.gender.length === 0
      && this.state.error.profilePicture.length === 0 && this.state.error.startDate.length === 0) {
      this.setState({ isError: false });
    } else {
      this.setState({ isError: true });
    }
  }

  checkValidations = async () => {
    await this.checkName(this.state.name);
    await this.checkProfilePicture(this.state.profilePicture);
    await this.checkStartDate(this.state.startDate);
    await this.checkDepartment(this.state.departments);
    await this.checkGender(this.state.gender);
    await this.checkGlobalError();
    return (this.state.isError);
  }
  save = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    saveOperation: {         
      if(await this.checkValidations()) {
        let errorLog = JSON.stringify(this.state.error);
        alert("Error Occured while Submitting the Form ==> ERROR LOG : " + errorLog);
        break saveOperation;
      }
      let object = {
        //id: this.state.id,
        name: this.state.name,
        profilePicture: this.state.profilePicture,
        gender: this.state.gender,
        departments: this.state.departments,
        salary: this.state.salary,
        startDate: this.state.startDate,
        notes: this.state.notes
      }
      console.log(object);
      new EmployeeService().addEmployee(object)
      .then(data => {
        alert("Employee Added Successfully!!!\n" + JSON.stringify(data))
        console.log("Employee Added Succesfully");
        this.props.history.push("/home");
      }).catch(error => {
        alert("Error while adding Employee!!!\nError : " + error);
        console.log("Employee are not added succesfully");
      })
      this.reset();
    
    }
}
  reset = () => {
    this.setState({ ...initialState });
  }
  render() {
    return (
      <div className="body">
        <div className="form-content">
          <form className="form" action="#" onSubmit={this.save} onReset={this.reset}>
            <div className="form-head">Employee Payroll form</div>
            <div className="row-content">
              <label className="label text" htmlFor="name">Name</label>
              <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={this.nameChangeHandler} placeholder="Your name.." required />
              <valid-message className="valid-name" htmlFor="name">{this.state.valid.name}</valid-message>
              <error-output className="name-error" htmlFor="name">{this.state.error.name}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="profilePicture">Profile Image</label>
              <div className="profile-radio-content">
                <label>
                  <input type="radio" id="profile1" name="profilePicture" value="../../assets/profile-images/Ellipse -3.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -3.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image1" src={profile1} alt="" />
                </label>
                <label>
                  <input type="radio" id="profile2" name="profilePicture" value="../../assets/profile-images/Ellipse -4.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -4.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image2" src={profile2} alt="" />
                </label>
                <label>
                  <input type="radio" id="profile3" name="profilePicture" value="../../assets/profile-images/Ellipse -5.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -5.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image3" src={profile3} alt="" />
                </label>
                <label>
                  <input type="radio" id="profile4" name="profilePicture" value="../../assets/profile-images/Ellipse -7.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -7.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image4" src={profile4} alt="" />
                </label>
                <label>
                  <input type="radio" id="profile5" name="profilePicture" value="../../assets/profile-images/Ellipse -2.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -2.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image5" src={profile5} alt="" />
                </label>
                <label>
                  <input type="radio" id="profile6" name="profile" value="../../assets/profile-images/Ellipse -1.png"
                    checked={this.state.profilePicture === '../../assets/profile-images/Ellipse -1.png'} onChange={this.profileChangeHandler} />
                  <img className="profile" id="image6" src={profile6} alt="" />
                </label>
              </div>
              <valid-message className="valid-profile" htmlFor="profilePicture">{this.state.valid.profilePicture}</valid-message>
              <error-output className="profile-error" htmlFor="profilePicture">{this.state.error.profilePicture}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="gender">Gender</label>
              <div>
                <label>
                  <input type="radio" id="male" checked={this.state.gender === 'male'} onChange={this.genderChangeHandler} name="gender" value="male" />
                  <label className="text" htmlFor="male">Male</label>
                </label>
                <label>
                  <input type="radio" id="female" checked={this.state.gender === 'female'} onChange={this.genderChangeHandler} name="gender" value="female" />
                  <label className="text" htmlFor="female">Female</label>
                </label>
              </div>
              <valid-message className="valid-gender" htmlFor="gender">{this.state.valid.gender}</valid-message>
              <error-output className="gender-error" htmlFor="gender">{this.state.error.gender}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="department">Department</label>
              <div>
                <label>
                  <input className="checkbox" type="checkbox" id="hr" name="department" value="HR" onChange={this.departmentChangeHandler} />
                  <label className="text" htmlFor="hr">HR</label>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" id="sales" name="department" value="Sales" onChange={this.departmentChangeHandler} />
                  <label className="text" htmlFor="sales">Sales</label>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" id="finance" name="department" value="Finance" onChange={this.departmentChangeHandler} />
                  <label className="text" htmlFor="finance">Finance</label>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" id="engineer" name="department" value="Engineer" onChange={this.departmentChangeHandler} />
                  <label className="text" htmlFor="engineer">Engineer</label>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" id="others" name="department" value="Others" onChange={this.departmentChangeHandler} />
                  <label className="text" htmlFor="others">Others</label>
                </label>
              </div>
              <valid-message className="valid-department" htmlFor="department">{this.state.valid.department}</valid-message>
              <error-output className="department-error" htmlFor="department">{this.state.error.department}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="salary">Salary</label>
              <input className="input" type="range" name="salary" id="salary" onChange={this.salaryChangeHandler}
                min="30000" max="50000" step="100" value={this.state.salary} />
              <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="startDate">Start Date</label>
              <div name="startdate" id="startDate">
                <select onChange={this.dayChangeHandler} value={this.state.day} id="day" name="day">
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select onChange={this.monthChangeHandler} value={this.state.month} id="month" name="month">
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="Jun">June</option>
                  <option value="July">July</option>
                  <option value="Aug">August</option>
                  <option value="Sep">September</option>
                  <option value="Oct">October</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </select>
                <select onChange={this.yearChangeHandler} value={this.state.year} id="year" name="year">
                  <option value='2021'>2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                </select>
              </div>
              <valid-message className="valid-startDate" htmlFor="startDate">{this.state.valid.startDate}</valid-message>
              <error-output className="startDate-error" htmlFor="startDate">{this.state.error.startDate}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="notes">Notes</label>
              <textarea className="input" onChange={this.notesChangeHandler} value={this.state.notes} id="notes" name="notes" placeholder="Write a note..." style={{ height: '100px' }}></textarea>
            </div>
            <div className="buttonParent">
              <Link to='' className="resetButton button cancelButton">Cancel</Link>
              <div className="submit-reset">
                <button className="button submitButton" type="submit" id="submitButton">{this.state.isUpdate ? 'Update' : 'Submit'}</button>
                <button className="resetButton button" type="reset">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(PayrollForm);