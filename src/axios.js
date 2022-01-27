import axios from 'axios'

const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3",
})

//instance.get('/blah) is 'http://api.themoviedb.org/3/blah' 
//blah is appended at the base url
//similarly the requests will be appended to this base URL

export default instance;