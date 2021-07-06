import config from '../config/config';
import AxiosService from '../services/axios-service'

export default class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(data){
        return AxiosService.postService('http://localhost:3000/employee',data);
    }
}