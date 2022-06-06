import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

import { UserAuthContext, UserDetailsContext } from '../contexts/userContext';

const baseURL = 'http://127.0.0.1:8000'


const useAxios = () => {

    const { state } = useContext(UserAuthContext)
    const { userInfo } = state


    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${userInfo?.tokens?.access}` }
    });


    axiosInstance.interceptors.request.use(async (req) => {

        const user = jwt_decode(userInfo?.tokens?.access)                          

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;               

        if (!isExpired) return req                                               

        const response = await axios.post(`${baseURL}/api/users/token/refresh/`, {
            'Content-type': 'application/json',
            refresh: userInfo?.tokens?.refresh                                         
        });

        var userInfostorage = JSON.parse(localStorage.getItem('userInfo'))
        userInfostorage.tokens = response.data

        localStorage.setItem('userInfo', JSON.stringify(userInfostorage))       

        req.headers.Authorization = `Bearer ${response?.data?.access}`            
        return req                                                              


    })

    return axiosInstance                                                        

}

export default useAxios;                                                        

