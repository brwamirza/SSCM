import http from "../http-common";
var xmlhttp = new XMLHttpRequest();

class soapService {
// SSCM Subscriber status change soap request
SubscriberStatusChange(msisdn,statusTo){

        return http.post("/sscm/subscriberStatusChange",{
            msisdn,
            statusTo
        });
    }   
}
export default new soapService();