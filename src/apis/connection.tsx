import axios from "axios";
import React from "react";
// const list = async (method: any, url: any, check: boolean | null = null, data: any | null = null) => {
//     const respons = await fetch(url, {
//         body: JSON.stringify(data),
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//             'X-My-Custom-Header': 'value-v',
//             'Access-Control-Allow-Origin': '*',
//             'Accept': 'application/json'
//         }
//     }).then((res) => res.json()).then((data) => {
//         const da = data + "dasd";
//         return da;
//     });
// }

const con = async (method: any, url: any, check: boolean | null = null, body: any | null = null) => {

    var headers = new Headers();
    headers.append("X-My-Custom-Header", "value-v");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Accept", "application/json");



    if (check == true && body == null) {
        var token = localStorage.getItem("token");
        body = [];
        body = { "token": token }
    } else if (check == true && body !== null) {
        var token = localStorage.getItem("token");
        var t = { "token": `${token}` }
        body = Object.assign(body, t);
        console.log(body)
    } else {

    }


    if (body["dataType"] == "form") {
        body = body;
        headers.append("Content-Type", "multipart/form-data");
    } else if (body["dataType"] !== "form") {
        body = JSON.stringify(body)
        headers.append("Content-Type", "application/json");
    } else {
        body = JSON.stringify(body)
        headers.append("Content-Type", "application/json");
    }
    const payload = body
    console.log(body,"ASdasdasdas");
    
    try {
        const datass = await axios.post(url, {"token":"3c863da559610f2f499d332e7ba6fc9d"});
        console.log(datass.data,"console");
        return datass.data;
    } catch (error) {
        return "error";
    }

}
export default con;