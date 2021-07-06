const axios = require('axios').default;
class AxiosService {
    postService(url = '', payload = null, tokenrequired = false, httpOptions = null) {
        return axios.post(url, payload, tokenrequired && httpOptions);
    }
}
module.exports = new AxiosService()