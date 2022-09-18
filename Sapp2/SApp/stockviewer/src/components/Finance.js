
import React from 'react';
import {useEffect , useState} from 'react';
import { w3cwebsocket as websocket } from "websocket";
import { request } from 'websocket';
const crypto_api = '966bab8576315a5977c6f37beb2bb1764cb23c0d'

 

/* const axios = require('axios');
let response = null;  
var express = require('express')
var https = require('https')
var http = require('http')
var app = express()
http.createServer(app).listen(3000)
https.createServer(options, app).listen(3000) */



let l
 
const AlpacaFinance = (props)    => 

{
 
    let [finance, setFinance ] = useState({}) ;

    let get_fdata = async() =>
    {
        let yfinance = ("https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=10000&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH,USDT,BNB&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,logo")
            
        let fetch_api = await fetch(yfinance,
            
    )
     
        let data = await fetch_api.json()
     

     
        console.log(data['data']['cryptoCurrencyList'])
        
    
      
        setFinance(data['data']['cryptoCurrencyList'])
    }
        useEffect(() => 
        {
            get_fdata()
        },[]);
     
    
            return(
                <div>
               {finance.map((data_cryptoCurrencyList,index) => 
               <div>
                    <h2> {data_cryptoCurrencyList.id} </h2>
                    <h2> {data_cryptoCurrencyList.low24h} </h2>
                    <h2> {data_cryptoCurrencyList.high24h} </h2>
                </div>
               )}
            <div>
                  
                
                    <div >
        
                    </div>
                
                     
            </div>
                    
            </div>
        ) 

}
export default AlpacaFinance;