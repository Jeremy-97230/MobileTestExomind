import { json } from 'express/lib/response'
import React from 'react'
// data token meteo-concept
const data = {
    token: "509cd73394fc8d1e5a6485934cbae884b509887f47841388f8a0e97b07f18370",
}

// generate url to request api 
const url = (token, insee) =>{
    return `https://api.meteo-concept.com/api/forecast/daily?token=${token}&insee=${insee}`
}

// export final url request 
const UrlRequest = (useInsee) => {
  return url(data.token, useInsee)
}

// send request api
const launchApi = (url) => {
    
    const result = fetch(url,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => {
        if (resp.ok){
            return resp.json()
        }else{
            return "error"
        }
    })
    .then((jsonData) => {
        return jsonData
    })
    return result
}


export {UrlRequest, launchApi}