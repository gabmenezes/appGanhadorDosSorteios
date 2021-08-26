import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../util/config'

class BotService {
    
    async iniciarBot(data){
        const token = await AsyncStorage.getItem("TOKEN");
        
        return  axios({
            url: `${Config.API_URL}/users/configrobo`,
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

    async pararBot(data){
        const token = await AsyncStorage.getItem("TOKEN");
        
        return  axios({
            url: `${Config.API_URL}/users/stopBot`,
            method: "put",
            timeout: Config.TIMEOUT,
            data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            return Promise.resolve(response.data);
        }).catch((err) => {
            
            return Promise.reject(err);
        })
    }

    async verificarBot(){
        
        const token = await AsyncStorage.getItem("TOKEN");
        
        return  axios({
            url: `${Config.API_URL}/users/verificarbot`,
            method: "get",
            timeout: Config.TIMEOUT,
            // data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            
            
            return Promise.resolve(response.data);
        }).catch((err) => {
            
            
            return Promise.reject(err);
        })
    }
}

const botService = new BotService();
export default botService;