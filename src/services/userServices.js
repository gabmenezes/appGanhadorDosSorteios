import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../util/config'

class UserService {
    
    async login(data){
        return  axios({
            url: `${Config.API_URL}/users/login`,
            method: "post",
            timeout: Config.TIMEOUT,
            data: data,
            headers: Config.HEADER,
        }).then((response) => {
            
            AsyncStorage.setItem('TOKEN',response.data.access_token )
            return Promise.resolve(response);
        }).catch((err) => {
            
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
            
            return Promise.reject(err);
        })
    }

    async getPerfis(data){
        
        const token = await AsyncStorage.getItem("TOKEN");
        
        return axios({
            url: `${Config.API_URL}/users/perfis`,
            method: "get",
            timeout: Config.TIMEOUT,
            data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            return Promise.resolve(response.data);
        }).catch((err) => {
            
            return Promise.reject(err);
        })
    }

    async updatePerfis(data){
        
        
        const token = await AsyncStorage.getItem("TOKEN");
        
        return  axios({
            url: `${Config.API_URL}/users/perfis`,
            method: "post",
            timeout: Config.TIMEOUT,
            data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            
            
            return Promise.resolve(response.data);
        }).catch((err) => {
            
            
            return Promise.reject(err);
        })
    }

}

const usuarioService = new UserService();
export default usuarioService;