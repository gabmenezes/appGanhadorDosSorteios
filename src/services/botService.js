import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../util/config'

class BotService {
    
    async iniciarBot(data){
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return  axios({
            url: `${Config.API_URL}/users/configrobo`,
            method: "post",
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


    async pararBot(data){
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return  axios({
            url: `${Config.API_URL}/users/stopBot`,
            method: "put",
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


    async verificarBot(){
        console.log("=======BAUM")
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return  axios({
            url: `${Config.API_URL}/users/verificarbot`,
            method: "get",
            timeout: Config.TIMEOUT,
            // data: data,
            headers: {...Config.HEADER, authorization: token },
        }).then((response) => {
            console.log("=======BAUM")
            console.log(response.data)
            return Promise.resolve(response.data);
        }).catch((err) => {
            console.log("=======RUIM")
            console.log(err);
            return Promise.reject(err);
        })
    }



}

const botService = new BotService();
export default botService;