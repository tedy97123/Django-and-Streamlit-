import React from 'react';
import {useEffect , useState} from 'react';
import { w3cwebsocket as websocket } from "websocket";
import {Trie} from '../Data_Structure/trie';
import '../Apps/CSS/News.css';
import { request } from 'websocket';
let news_api_key = '881512304d47438db8dd2642869fe6da'; 
const cryptolist = ['ETHUSD','DOGEUSD','AAVEUSD','BATUSD','BTCUSD','BCHUSD','LINKUSD','DOGEUSD','GRTUSD','LTCUSD','MKRUSD','MATICUSD','PAXGUSD','SHIBUSD','SOLUSD','SUSHIUSD','USDTUSD','TRXUSD','UNIUSD','WBTCUSD','YFIUSD']
 
 

let News = () => 
{
    let [newsData,setNewsData] =useState([])
    let get_data = async ()  =>    
    { 
    const current_date = Date.now();
    let yfinance =  (`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=881512304d47438db8dd2642869fe6da`);
            
    let fetch_api = await fetch(yfinance,
        {
            headers:
            {   
                
                'X-Api-Key': '881512304d47438db8dd2642869fe6da',
                'Authorization': '881512304d47438db8dd2642869fe6da'
            }
        })
    
        let data = await fetch_api.json()
        console.log(data['articles'])

        setNewsData(data['articles'])
    }
        useEffect(()=> 
        { 
            get_data()
            
        },[]);
 
            

 
            return(
                <div>
                    <div  id= 'title'>
                       
                    </div>
                 <div>
                         {newsData.map((news_articles,index) => 
                     
                        <div key={index}>
                        
                            <center> 
                                <h2 className='news_headline'>{news_articles.title}</h2>
                            </center>
                            <img className='news_url' src={news_articles.urlToImage}></img>
                            <center> 
                            <p className ='news_discription'>{news_articles.description}</p>
                            </center>
                            <a   href={news_articles.url} target={news_articles.url} className ='news_link'>{news_articles.url}</a>
                             <div className ='news_author'>By: {news_articles.author}</div>  
                        </div>
                     
                        )} 
                    </div>
                        
                </div>
      
     ) 
 }

   
       

 export default News;
                











/* let headlinesElement = document.getElementById('headline');
let summaryElement = document.getElementById('summary');
let urlElement = document.getElementById('url');
let sourceElememt = document.getElementById('source');
let authorElemet = document.getElementById('author');
let imagesElemt = document.getElementById('images');
const API_SECRET = 'i3zY5rqA911ZufMFmC4vdk8WGbvETYrOxJ4ecR9W'
const API_KEY_ID = 'PKML87H8P3JB8OPF2AZS'; 
const auth = {"action": "auth", "key": API_KEY_ID, "secret": API_SECRET};
const news_subscription = {"action":"subscribe","news":['ETHUSD','DOGEUSD','AAVEUSD','BATUSD','BTCUSD','BCHUSD','LINKUSD','DOGEUSD','GRTUSD','LTCUSD','MKRUSD','MATICUSD','PAXGUSD','SHIBUSD','SOLUSD','SUSHIUSD','USDTUSD','TRXUSD','UNIUSD','WBTCUSD','YFIUSD']}
const test = {"action":"subscribe","news":["*"]}
const url = "wss://stream.data.alpaca.markets/v1beta1/news"
let active_socket = null
let sent_auth = false; 
let key = []; */
/* 
/*  
let News = () =>
{

useEffect(()=> { 

        active_socket = new WebSocket(url)
    
        active_socket.onmessage = (data) => {
            console.log(data,'news')
            
            data = JSON.parse(data.data);
                
            console.log ( 'we in bby')
    
            if (data[0]['msg']  === 'connected')
            {
                
                return active_socket.send(JSON.stringify(auth));
            };
    
            if (data[0]['msg'] === 'authenticated')
            {
                return active_socket.send(JSON.stringify(news_subscription));
            }
            console.log(data)

    active_socket.onmessage = (Event) =>
    {
        let data = JSON.parse(Event.data);
        
        for (key in data)
        {
       let news_headline = data.filter(function(message) {
            return message.headline === ''
            console.log(news_headline)
        })
    }
    }  
  }      
 }) 

let key = [];
/*  




/* const T = new Trie()
 let News = () =>                              
        {
            let [newsData,setNewsData] = useState([])
            let get_data = async ()  => 
            {
                    const options = 
                    {
                        method: 'GET',
                        headers: 
                        {
                            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
                            'X-RapidAPI-Key': '5ce3259baamsh927e932246a4b9bp13b280jsne1e7b7bc0238'
                        }
                    }; */
                                        /*                   
                                            fetch('https://yh-finance.p.rapidapi.com/auto-complete?q=tesla&region=US', options)
                                            .then(response => response.json())
                                            .then(response => console.log(response))
                                            .catch(err => console.error(err)); 
                                        */
/*                                             let alpacas = (url);
            
                                            let fetch_api = await fetch(yfinance,
                                                {
                                                    headers:
                                                    {
                                                        method:'GET',
                                                        'APCA-API-KEY-ID': API_KEY_ID,
                                                        'APCA-API-SECRET-KEY': API_SECRET
                                                    }
                                                })
                                            let data = await fetch_api.json()
                                            console.log(data) */
                                          /*   console.log(data['item']) */
                
            /*     for (key in data['item'])
                {
                    let arr = []
                    let keys = Object.keys(data.item)
                    console.log(data['item'][key]) 
            
                    const type = data['item'][key]
            
                    
                    if (type == 'description')
                    {
            
                    } 
                } */
        /*         setNewsData(data)
            }
            

            useEffect(()=> 
            { 
                get_data()
                
            },[]); */


  


