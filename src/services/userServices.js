import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../util/config'

class UserService {
    
    async login(data){
        // console.log("responseaaaaaadd")
        // const response  = await axios.post(`http://192.168.0.102:3000/users/login`,{email: "testezdf@aaaa.com", password: "vaprzim"},
        // {
        //         'Accept': 'application/json',
        //     },
        // )
        // return response;

        return  axios({
            url: `${Config.API_URL}/users/login`,
            method: "post",
            timeout: Config.TIMEOUT,
            data: data,
            headers: Config.HEADER,
        }).then((response) => {
            console.log(response.data.access_token);
            AsyncStorage.setItem('TOKEN',response.data.access_token )
            return Promise.resolve(response);
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
    }

    async loginWithToken(token){
        return  axios({
            url: `${Config.API_URL}/users/login-token`,
            method: "post",
            timeout: Config.TIMEOUT,
            data: token,
            headers: Config.HEADER,
        }).then((response) => {
            AsyncStorage.setItem('TOKEN',response.data.access_token )
            return Promise.resolve(response);
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
    }

    async getPerfis(data){
        console.log("=========TENTANDO PEGAR=")
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return axios({
            url: `${Config.API_URL}/users/perfis`,
            method: "get",
            timeout: Config.TIMEOUT,
            data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            return Promise.resolve(response.data);
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
    }

    async updatePerfis(data){
        console.log("==================")
        console.log(data)
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return  axios({
            url: `${Config.API_URL}/users/perfis`,
            method: "post",
            timeout: Config.TIMEOUT,
            data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            console.log("DEU BAUM response")
            console.log(response.data)
            return Promise.resolve(response.data);
        }).catch((err) => {
            console.log("======ERR========");
            console.log(err);
            return Promise.reject(err);
        })
    }

}

const usuarioService = new UserService();
export default usuarioService;