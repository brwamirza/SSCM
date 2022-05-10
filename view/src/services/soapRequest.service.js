import http from "../http-common";
var xmlhttp = new XMLHttpRequest();

class soapService {
// SSCM Subscriber status change soap request
SubscriberStatusChange(msisdn){
    // var sr=
    //     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.esdp.ericsson.com">'+
    //     '<soapenv:Header/>'+
    //     '<soapenv:Body>'+
    //     '<ws:subscriberStatusChange>'+
    //     '<ws:msisdn>'+msisdn+'</ws:msisdn>'+
    //     '<ws:newStatus>3</ws:newStatus>'+
    //     '<ws:transactionId>'+msisdn+'</ws:transactionId>'+
    //     '</ws:subscriberStatusChange>'+
    //     '</soapenv:Body>'+
    //     '</soapenv:Envelope>';
        return http.post("/sscm/subscriberStatusChange",{
            msisdn
        });
        // xmlhttp.open('POST', 'http://10.26.57.07:9080/esdp-wsPort', true);
    // build SOAP request
    // var sr =
        // '<?xml version="1.0" encoding="utf-8"?>' +
        // '<soapenv:Envelope ' + 
        //     'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        //     'xmlns:api="http://127.0.0.1/Integrics/Enswitch/API" ' +
        //     'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        //     'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
        //     '<soapenv:Body>' +
        //         '<api:some_api_call soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        //             '<username xsi:type="xsd:string">login_username</username>' +
        //             '<password xsi:type="xsd:string">password</password>' +
        //         '</api:some_api_call>' +
        //     '</soapenv:Body>' +
        // '</soapenv:Envelope>';
    


    // xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState == 4) {
    //         if (xmlhttp.status == 200) {
    //             alert(xmlhttp.responseText);
    //             // alert('done. use firebug/console to see network response');
    //         }
    //     }
    // }
    // // Send the POST request
    // // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    // xmlhttp.setRequestHeader('X-PINGOTHER', 'pingpong');
    // xmlhttp.setRequestHeader('Content-Type', 'application/xml'); 
    // xmlhttp.send(sr);
    // send request
    }   
}
export default new soapService();