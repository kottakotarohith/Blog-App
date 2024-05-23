import axios  from "axios";

const token = localStorage.getItem('token')
console.log(token)
export const axiosWithToken = axios.create({
    headers:{Authorization: `Bearer ${token}`}
})