import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../util/config'

class InstagramService {
    
    async login(data){
        const token = await AsyncStorage.getItem("TOKEN");
        console.log(token);
        return axios({
            url: `${Config.API_URL}/users/cadastrarinsta`,
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

}

const instagramService = new InstagramService();
export default instagramService;