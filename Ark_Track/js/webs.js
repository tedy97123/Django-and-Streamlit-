function jsonToQueryString(json) {
    return Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

var userPrincipalsResponse =  https://api.tdameritrade.com/v1/oauth2/token


//Converts ISO-8601 response in snapshot to ms since epoch accepted by Streamer
var tokenTimeStampAsDateObj = new Date(userPrincipalsResponse.streamerInfo.tokenTimestamp);
var tokenTimeStampAsMs = tokenTimeStampAsDateObj.getTime();

var credentials = {
"userid": userPrincipalsResponse.accounts[0].accountId,
"token": userPrincipalsResponse.streamerInfo.token,
"company": userPrincipalsResponse.accounts[0].company,
"segment": userPrincipalsResponse.accounts[0].segment,
"cddomain": userPrincipalsResponse.accounts[0].accountCdDomainId,
"usergroup": userPrincipalsResponse.streamerInfo.userGroup,
"accesslevel": userPrincipalsResponse.streamerInfo.accessLevel,
"authorized": "Y",
"timestamp": tokenTimeStampAsMs,
"appid": userPrincipalsResponse.streamerInfo.appId,
"acl": userPrincipalsResponse.streamerInfo.acl
}

var request = {
"requests": [
        {
            "service": "ADMIN",
            "command": "LOGIN",
            "requestid": 0,
            "account": userPrincipalsResponse.accounts[0].accountId,
            "source": userPrincipalsResponse.streamerInfo.appId,
            "parameters": {
                "credential": jsonToQueryString(credentials),
                "token": userPrincipalsResponse.streamerInfo.token,
                "version": "1.0"
            }
        }
]
}

var mySock = new WebSocket("wss://" + userPrincipalsResponse.streamerInfo.streamerSocketUrl + "/ws"); 

mySock.onmessage = function(evt) { console.log(evt.data); }; mySock.onclose = function() { console.log("CLOSED"); };