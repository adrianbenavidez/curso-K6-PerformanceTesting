//importamos el cliente http
import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    vus: 10,
    duration:'10s',
    thresholds: {
        http_req_duration: ['p(95)<8500'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>=20']
    }
}

export default function(){

    const baseURL = 'https://external-pre-api.gruposancorseguros.com';
    var endPoint = '/apipsalud/tst/afiliaciones-api/affiliate/recoverAffiliates';
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
        "userCodeCeibo": 11260,
        "onlyActive": "Yes",
        "OnlyHolder": "No",
        "ResultLimit": 200,
        "OnlyToFuture": "No",
        "QuickSearch": true
    })

    let response = http.post(URL, payload, params);

    check(response,{
        'is status 200': (r)=>r.status === 200,
        //'text verification': (r)=>r.body.includes("Ya existe"),
        //'body size': (r)=>r.body.length === 135
    })

    
    sleep(2) 
    
    //console.log(response.body.length)
    //console.log(response.body)
}