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
// SSCM Stop Renewal soap request
StopRenewal(msisdn,offerId,campaignId,channel,currentDate,transactionId){
    return http.post("/sscm/stopRenewal",{
        msisdn,
        offerId,
        campaignId,
        channel,
        currentDate,
        transactionId
    });
}
// SSCM Termination soap request
TerminateOffer(msisdn,offerId,channel){
    return http.post("/sscm/terminateOffer",{
        msisdn,
        offerId,
        channel
    });
}   
}
export default new soapService();