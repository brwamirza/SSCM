import http from "../http-common";

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

// SSCM Termination soap request
RetrieveSubscriptions(msisdn){
    return http.post("/sscm/retrieveSubscriptions",{
        msisdn
    });
} 

// AIR susbcriber info
RetrieveSubscriberInfo(msisdn){
    return http.post("/air/retrieveSubscriberInfo",{
        msisdn
    });
} 

}
export default new soapService();