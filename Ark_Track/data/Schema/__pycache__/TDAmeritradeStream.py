import os, sys
currentdir='C:\\Users\\secre\\Ark_Track\\'
for base, dir, file in os.walk(currentdir):
    for dir in dir:
        pathstr=str(os.path.join(base,dir))+'\\'
        sys.path.append(pathstr)


import time
import requests
from requests import Request
import urllib
from splinter.browser import Browser
from TD_config import (account_number, account_password, client_id,)



class TdAuthentication(object):
    def __init__(self, client_id, account_number, password):
        self.clientid = client_id
        self.account_number = account_number
        self.password = password
        self.access_code = None
        self.access_token = None
      
    
    def get_access_code(self):
        #define the location of the Chrom Driver
        executable_path = {'executable_path': r'C:/Users/secre/OneDrive/Desktop/New folder/ChromeDriver.exe'}
        browser= Browser('chrome', **executable_path, headless=True)

        #define the components to build a url
        method = 'GET'
        url = 'https://auth.tdameritrade.com/auth?'
        client_code = self.clientid + '@AMER.OAUTHAP'
        payload = {'responce_type':'code', 'redirect_uri':'http://localhost','clientid_id':client_code}

        #build the URL and store it in a new variable
        p= Request(method, url, params=payload).prepare()
        myurl = p.url

        # go to the url
        browser.visit(myurl)

        #define items to fill out from
        payload = {'username': self.account_number,
                'password': self.password}

    # fillout each part of the form and click submit

        username =browser.finder.find_by_id('username').first.fill(payload['username'])
        password = browser.finder.find_by_id("password").first.fill(payload['password'])
        submit = browser.find_by_id("accept").first.click()
        
        # click the accpet term button
        browser.find_by_id('accept').first.click()

        #give it a second, then grab the url
        time.sleep(1)
        new_url = browser.url 

        #grab the part we need, and decode it
        access_code = urllib.parse.unquote(new_url.split('code=')[1])

        #close the browser
        browser.quit()
        self.access_code = access_code 
        return access_code
    print('words2')
    def get_access_token(self):
        url = r'https://api.tdameritrade.com/v1/oauth2/token'
        headers={"Content-Type":"apllication/x-www-form-urlencoded"}

        payload={'grant_type': 'authorization_code',
        'access_type':'offline',
        'code':self.access_code,
        'client_id':self.client_id,
        'redirect_uri':'http://localhost'}


        authReply=requests.post(url, headers=headers,data=payload)
        decoded_content=authReply.json()
        access_token=decoded_content['access_token']
        os.environ['td_token']=str(access_token)
        self.access_token=access_token

    def authenticate(self):
        try:
            self.access_token=os.environ['td_token']
        except KeyError:
            self.get_access_code()
            self.get_access_token()
print('Works')