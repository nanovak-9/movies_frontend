import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/'

//User Registration

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        return response.data
    }

}

//User Sign in

const signin = async(userData) => {
    const response = await axios.post(API_URL + 'signin', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }

}

//User Sign out

const signout = () => {
    localStorage.removeItem('user')
}

//Return user likes

const myData = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(API_URL + 'mydata', config)

    return response.data
}


const authService = {
    register, signin, signout, myData
}

export default authService