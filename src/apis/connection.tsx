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

const con = (method: any, url: any, check: boolean | null = null, body: any | null = null) => {

    var headers = new Headers();
    headers.append("X-My-Custom-Header", "value-v");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Accept", "application/json");



    if (check == true && body == null) {
        var token = localStorage.getItem("token");
        body = [];
        body = {"token": token}
    }else if(check == true && body !== null) {
        var token = localStorage.getItem("token");
        var t = {"token":`${token}`}
        body = Object.assign(body,t);
        console.log(body)
    }else{
        
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

    
    const datas = new Promise<any>((resolve, reject) => {
        fetch(url, {
            body: body,
            method: method,
            headers:headers
        }).then((res) => res.json()).then((data) => {
            return resolve(data);
        }).catch((err) => {
            console.error('API CLIENT ERROR CATCHED :: ', url, err);
            reject(err);
        });
    });
    return datas;
}
export default con;