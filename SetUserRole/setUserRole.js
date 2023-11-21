//importamos el cliente http
import http from 'k6/http';
import {check, sleep} from 'k6';

export default function(){

    const baseURL = 'https://external-pre-api.gruposancorseguros.com';
    var endPoint = '/apipsalud/tst/agi/intermediaryUser/setUserRole';
    var URL = baseURL + endPoint;

    const params = {
        headers: {
            'content-type':'application/json',
            accept: 'application/json',
            'clientId':'851dcea32f4b4c2cd698e65a42be2b8d',
            'clientSecret':'887cec1856bfbd46358e8ec1598b20e8',
        },
    }

    const payload = JSON.stringify({
        "Auth0Id": "auth0|563bb1fc382e7b14260042b6",
        "RoleId": 3
    })

    let response = http.post(URL, payload, params);

    check(response,{
        'is status 200': (r)=>r.status === 200,
        'text verification': (r)=>r.body.includes("Ya existe"),
        'body size': (r)=>r.body.length === 135
    })

    
    sleep(1) 
    
    console.log(response.body.length)
    console.log(response.body)
}