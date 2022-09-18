import os
import sys

currentdir='C:\\Users\\secre\\Ark-Track\\'

for base, dir, file in os.walk(currentdir):
    for dir in dir:
        pathstr=str(os.path.join(base,dir))+'\\'
        sys.path.append(pathstr)
import time
import urllib
import requests
from splinter import Browser
from Ark_Track.data.Schema.TD_config import password, account_number, client_id, username

# --------------------- AUTHENTICATION AUTOMATION --------------------------

username = "tedyyohanes97"
password = "Thebrother123"
api_key = "ynEY889e0GIASmGWGI/xmSR+k59oIGj6kYRFDEKLCAJeTF7Ccd4WnwxyHFLGkDksK2EpwWKGvfj53/e08aOAREOCjCdSkMPHiDhUx8bp1BnB0rTg5gCwXlf0fVu5o4K6T66t1fSdNzwAbvpgeAlsOsUVV5a36i3qsDxCqIl+pxbfaI+CbVF0hslK9CAMm1AZRQgWnGBOSgh63SGyd7BfidB3gsjLe08pT7j4sK7pa5xD9PK0nH6EU8u14J0o7UtkNNoDHUXY4xarH6jvc+2esoHA3JdwzTC2/hEgzxsqkNlZL+yXXGwFMJ+P1tMR3BOFb8GsVrBs986LNqn8KNHkIKLzUWrTD9Zj0GMDrO33eXNB11V4ksfb5yyAiMNpWVenduUNVPzUZMKRVlbGzjlBiNewKCaIoCxchQD2VDbiO5eHG3SWyPWJAjqEUGXDsVNsD+LFLx2iJ/QTggQG6O5vZqj4wXHd5imCGtkZ/qhVMuqxow1nNE5y73epv8MyxkYWaEWBg/F3fOmrgfXcaU5MiAU8jcavjmMlxk6a9MLXxKG1nlziU100MQuG4LYrgoVi/JHHvlwLjMA3fBJ+CuJLkBAp14zOZ8k3uK9NkC97OWIg6+tffKBhea4zi5pRq8U+qJUXCeLjSKqsXRCMQ2VnY5qrZaZmvtX/jePr5Ts2FpUlXLfo/Hio/19UsIpxuuokyx3J7J1kW57ZOBpjZTPQjgGj4ti3rooxhIeYRiaZ+nTcfpwoU9iZdZ3FMqo4WslWbVWcZV2gdGkYWTNFUH8IfZBa7dISwrnfj31Q6p4PF3+JN/L3L5RZbIGlx0SF0D65lOqKmqZzNB09ZB17J5SIF6BDndudcHg0DLUgScEKBoHnX1Srh+WKTIcvbKs1bvsK8YGOIj8tzpyPx7wAuA1oaG7qNGl5/Y5UjW+62PbW5FqDI5XfvjttRbyQEg3sBueC7GGic/5IVuepe7gZ6GR3pGHJnkDG0OpsalS9mphFe3sQMsPAVbTajgPt6uWL02JBan18Wnq+YqwFXjunW3ghRG9TP7YZOvudRW8p6mJIH9Thq5o/hR/HhwMwTd9U7P2sKCVulscyZ030vUJ3Zl3YmVWi8UdULmpWHC8q9q3hY2Qj/zZSDtHKFQ==212FD3x19z9sWBHDJACbC00B75E"

# Define path to Web Driver
executable_path = {'executable_path': r'C:/Users/secre/OneDrive/Desktop/New folder/ChromeDriver.exe'}

# Open a new browser
browser = Browser('chrome', **executable_path, headless=False)

# Define the components of request
method = 'GET'
url = 'https://auth.tdameritrade.com/auth?'
client_code = api_key + '@AMER.OAUTHAP'

# Define Payload, MAKE SURE TO HAVE THE CORRECT REDIRECT URI
payload_auth = {'response_type': 'code', 'redirect_uri': '127.0.0', 'client_id': client_code}
built_url = requests.Request(method, url, params=payload_auth).prepare()

# Go to the URL
my_url = built_url.url
browser.visit(my_url)

# Fill Out the Form
payload_fill = {'username': username, 'password': password}
browser.find_by_id('username').first.fill(payload_fill['username'])
browser.find_by_id('password').first.fill(payload_fill['password'])
browser.find_by_id('accept').first.click()
time.sleep(1)

# Get the Text Message Box
browser.find_by_text('Can\'t get the text message?').first.click()

# Get the Answer Box
browser.find_by_value("Answer a security question").first.click()

# Answer the Security Questions.
if browser.is_text_present('What is your paternal grandfather\'s first name?'):
    browser.find_by_id('secretquestion').first.fill('myanswer')

elif browser.is_text_present('What was the first name of your first manager?'):
    browser.find_by_id('secretquestion').first.fill('myanswer')

elif browser.is_text_present('What was the name of your first pet?'):
    browser.find_by_id('secretquestion').first.fill('myanswer')

elif browser.is_text_present('What is your father\'s middle name?'):
    browser.find_by_id('secretquestion').first.fill('myanswer')

# Submit results
browser.find_by_id('accept').first.click()

#Trust this device
browser.find_by_xpath('/html/body/form/main/fieldset/div/div[1]/label').first.click()
browser.find_by_id('accept').first.click()

# Sleep and click Accept Terms.
time.sleep(1)
browser.find_by_id('accept').first.click()