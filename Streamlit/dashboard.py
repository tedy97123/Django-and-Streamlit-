import streamlit as st
import pandas as pd
import numpy as np
import requests
import tweepy
import config
import psycopg2, psycopg2.extras
#database Connection
'''connection = psycopg2.connect(host=config.DB_HOST,database=config.DB_NAME,user=config.DB_USER,password=config.DB_PASS)
cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)'''

#Twitter Authentication             
auth = tweepy.OAuthHandler(config.Twitter_Consumer_Key,config.Twitter_Consumer_Secret)
auth.set_access_token(config.Twitter_Consumer_Access_Token,config.Twitter_Consumer_Token_Secret)

API = tweepy.API(auth)

#SideBar
option = st.sidebar.selectbox('Data Sources',('Twitter','Wallstreetbets', 'Charts','Pattern','Stocktwits'))

    
st.header(option)

#Twitter
if option == 'Twitter':
  st.subheader("Twitter Stock Mentions")
  
  
  for username in config.twitter_usernames: 
    user = API.get_user(screen_name=username)
    tweets = API.user_timeline(screen_name=username)
    st.subheader(username)
    st.image(user.profile_image_url) 
    for tweet in tweets:
         if '$' in tweet.text:
             words = tweet.text.split(' ')
             for word in words:
                    if word.startswith('$') and word[1:].isalpha():
                        symbol=word[1:]
                        st.write(symbol)
                        st.subheader(tweet.text)
                        st.image(f"https://finviz.com/chart.ashx?t={symbol}")
                        
            
            
#Pattern
'''if option == 'Pattern':
  pattern = st.sidebar.selectbox(
    "Which Pattern",
    ("engulfing","threebar")
  )
  if pattern ==' engulfing':
    cursor.execute("""
                   Select *
                   FROM(
                        SELECT * FROM ( SELECT day, open, close, stock_id, 
                        LAG(close, 1) OVER ( PARTITION BY stock_id ORDER BY day ) previous_close, 
                        LAG(open, 1) OVER ( PARTITION BY stock_id ORDER BY day ) previous_open 
                        FROM daily_bars ) 
                        join stock ON stock.id = daily_bars.stock_id
                      ) a
                        Where previous_close < previous open and close > previous_open AND open < previous_close
                        AND day = '2021-12-06'
                  """)
  if pattern == 'threebar':
    cursor.execute'''
    
    
if option == 'Charts':
    st.subheader("This is the Chart dashboard")

#StockTwits
if option == 'Stocktwits':
  
     symbol= st.sidebar.text_input('Symbol',value='AAPL',max_chars=5,)
     st.image(f"https://finviz.com/chart.ashx?t={symbol}")
     r = requests.get(f"https://api.stocktwits.com/api/2/streams/symbol/{symbol}.json")

     data =r.json()
     for messages in data['messages']: 
            st.subheader(messages['user']['username'])
            st.image(messages['user']['avatar_url'])
            st.write(messages['body'])
            st.write(messages['created_at'])
            
      
        
