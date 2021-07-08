import React from 'react';
import EmployeeService from '../../services/employee-service';
import '../home/home.scss';
import {Link} from 'react-router-dom'
import addIcon from '../../assets/add-24px.svg';
import searchIcon from '../../assets/search_icon.svg';
import EmployeeList from '../employee/employee';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allEmployeeArray:[],
            employeeArray: [],
        };
        this.employeeService = new EmployeeService();
    }



    componentDidMount() {
        this.employeeService.getAllEmployees()
            .then(responseData => {
                  this.setState({allEmployeeArray: responseData.data});
                this.setState({ employeeArray: responseData.data });
            }).catch(errror => {
                console.log("Error while fetching Employee List\nError : " + JSON.stringify(errror));
            })

    }


    search = async (event) => {
        let searchName = event.target.value;
        await this.setState({ employeeArray: this.state.allEmployeeArray });
        let employeeList = this.state.employeeArray;
        if (searchName.trim().length > 0)
            employeeList = employeeList.filter((employee) =>
                employee.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1);
        this.setState({ employeeArray: employeeList });
    }

  render() {
    return (
        <div className="body">
            <div className="main-content">
                <div className="header-content">
                    <div className="heading">
                        Employee Details 
                        <div className="emp-count">
                            {this.state.employeeArray.length}
                        </div>
                    </div>
                    <div className="search-box" onClick={this.openSearch}>
                        <input className={"search-input " + (this.state.searchExpand && "input-expand")}
                            onChange={this.search} type="text" placeholder="" />
                        <img className="search-icon" src={searchIcon} alt="Search Icon" />
                    </div>
                    <Link to="payroll-form" className="add-button">
                        <img src={addIcon} alt="Add Button" />Add User
                    </Link>
                </div>
                <div className="table-main">
                    <EmployeeList employeeArray={this.state.employeeArray} />
                </div>
            </div>
        </div>
    );
  }
}
export default HomePage;

