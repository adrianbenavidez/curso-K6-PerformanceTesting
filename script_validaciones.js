//importamos el cliente http
import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 10,
    iterations:50,//este número de iteraciones es en total, así que no puede ser menor al número de usuarios virtuales
} 

export default function(){
    //let response = http.get('http://test.k6.io/')
    let response = http.get('https://external-pre-rest.gruposancorseguros.com/apipsalud/tst/agi/intermediaryUser/getUserRoles?auth0UserId=auth0|59d7708dffc3b2092577c292')
    check(response,{
        'is status 200': (r)=>r.status === 200,
        'text verification': (r)=>r.body.includes("Productor"),
        'body size': (r)=>r.body.length === 182
    })
    
    sleep(1) 
    //Cuando hacemos carga hay que borrar lo que mostramos por consola
    //console.log(response.status)
    //console.log(response.headers)
    console.log(response.body.length)
}

