import config from '../config/config';
const axios = require('axios').default;

export default class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(data){
        return axios.post('http://localhost:3000/employee',data);
    }
}