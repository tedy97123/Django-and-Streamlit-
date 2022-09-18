import urllib  
import json 
import requests 
import dateutil.parser 
from datetime import datetime 
#from TDAmeritradeStream import TdAuthentication
import data.Schema.__pycache__.ABC
from TD_config import account_password, account_number, client_id

TDClient =  ABC (account_password, account_number, client_id)
TDClient.authenticate()

access_token = TDClient.access_token

def unix_time_millis(dt):
    epoch = datetime.datetime.utcfromtimestamp(0)
    return (dt - epoch).total_seconds()*1000.0

# Define our endpoint which is User Principals endpoint
endpoint = 'https://api.tdameritrade.com/v1/userprincipals'
headers = {'Authoriztion': 'Bearer{}'.format(access_token)}

#define the parameter for the endpoint
params= {'fields': 'streamerSubscriptionKeys,streamerConnectionInfo'}

#make a request
content = requests.get(url=endpoint, params=params, headers=headers)
userPrincipalsResponce = content.json()
userPrincipalsResponce
