//importamos el cliente http
import http from 'k6/http';
import {check, sleep} from 'k6';
//import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//Sirve para hacer carga
export const options = {
    stages:[
        {duration:'5s', target:35},
        {duration:'5s', target:35},
        {duration:'10s', target:100},
        {duration:'5s', target:70},
        {duration:'10s', target:40},
        {duration:'10s', target:0},
    ],
    rps:5,
    thresholds:{
        http_req_failed:['rate<=0.01'],
        http_req_duration:['avg<200','p(95)<400']
        
    }
    
}

export default function(){
    //let response = http.get('http://test.k6.io/')
    
        let response = http.get('https://external-pre-rest.gruposancorseguros.com/apipsalud/tst/agi/intermediaryUser/getUserRoles?auth0UserId=auth0|59d7708dffc3b2092577c292')
        check(response,{
          'is status 200': (r)=>r.status === 200,
         'text verification': (r)=>r.body.includes("Productor"),
         'body size': (r)=>r.body.length === 200
         })
    
        sleep(1)
        //Cuando hacemos carga hay que borrar lo que mostramos por consola
        //console.log(response.status)
        //console.log(response.headers)
        //console.log(response.body)
    
}

/*export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}*/