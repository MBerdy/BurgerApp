import axios from 'axios';

const instance =  axios.create ({
    baseURL: 'https://burger-app-bc878.firebaseio.com/'
})

export default instance;