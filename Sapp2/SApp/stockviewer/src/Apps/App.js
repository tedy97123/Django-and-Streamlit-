import React from 'react';
import './CSS/App.css';
import AlpacaConnection from '../components/Stock_Streamer';
import News from '../components/News'
import AlpacaFinance from '../components/Finance';
import { w3cwebsocket as websocket } from "websocket";
import {useEffect , useState} from 'react';
import './CSS/stocklist.css';
import './CSS/style.css';
import logo from '../logo/logo.png';   
import CryptoList1 from '../components/cryptolist'  
import NewsCatcher from '../components/NewsCatcher'
let socket =  null ;
const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'
let cryptolist = ['ETHUSD','AAVEUSD','BATUSD','BTCUSD','BCHUSD','LINKUSD','DOGEUSD','GRTUSD','LTCUSD','MKRUSD','MATICUSD','PAXGUSD','SHIBUSD','SOLUSD','SUSHIUSD','USDTUSD','TRXUSD','UNIUSD','WBTCUSD','YFIUSD']
let news_sources = ['nytimes.com','wsj.com','ft.com','cnbc.com','bloomberg.com','barrons.com','fortune.com','latimes.com','theguardian.com']
let catagories =['Economics','History','Business','CryptoCurrencies','Society','Science','Programing','Philosophy','Market','Computers',]
export default class App extends React.Component 

  {
    constructor(props)
    {
      super(props);
      this.state = {
        change:true ,
        activechart :true,
        crypto :'ETHUSD',
        prev_crypto:'ETHUSD',
        chart :{},
        News : {},
        trade : {},
        quote : true,
        finData: true,
        finance :true,
        count:0,
        substatus:false,
        socket:null
      }

      this.getCrypto = () => 
      {
        return this.state.crypto
      }

      this.getUnsubStatus = () => this.state.substatus

      this.get_Financial_Data = (data) => 
      {
        this.state.finData(data);
      };
      this.resetUnsub = () => this.setState({unsubStatus:false})
    }
    


  componentDidMount()
  {
    console.log( this.state.crypto, 'Called')
    if(this.state.socket === null)
    {
      let ws = new websocket(url)
      console.log('this is first call ',crypto)
      this.setState({socket:ws})
      return AlpacaConnection(ws,this.getCrypto,this.getUnsubStatus,this.resetUnsub);
    }



  }
  componentDidUpdate()
  {
    if(this.state.prev_crypto !== this.state.crypto && this.state.substatus === false){
      console.log('substatus',this.state.substatus)
      return this.setState({prev_crypto:this.state.crypto})
    }
  }


  
 render()
 {
    return(
    <div> 
      <img style={{'marginLeft':'1200px'}}className='resize'src={logo} alt="logo"  />
        
        {/* <input type="search" id="site-search" name="q" style={{marginLeft:5}}></input> */}
      <div className="cryptolist">
        {
          cryptolist.map(
            (c,index)=> 
            <div className="cryptoitem" key={index}>
              <button onClick = 
                {
                  (e) => 
                  {
                    this.setState({crypto:e.target.innerHTML,substatus:true})
                  }
                }
              >
                {c}
              </button>
            </div>
            )
        }
      </div>
      {/* <button style={{marginLeft:10}}>Search</button> */}
      <div>
        <div> 
          <CryptoList1/>
        </div>
        <div className="stocklist_row_divChart" id= 'chart'  > Chart</div>   
                
      </div>  
      <div>
          <div  className="stocklist_Quote" > Quote</div>
          <div className="stocklist_Quotes" id = 'quote' ></div>

          <div className="stocklist_Trade">Trades</div> 
          <div className="stocklist_Trades"  id ='trade'></div>  
      </div>

      <div className='stocklist_row_divNews'> </div>
      
      <h1 style={{fontSize:'50px',fontfamily:'Handwritten',marginLeft:1175}}>News</h1>
      <div className="cryptolist">
        {
          catagories.map(
            (e,index)=> 
            <div className='catagories' key={index}>
              <button Onclick =
              {
                (e) =>
                {
                  this.setState({catagories:e.target.innerHTML,substatus:true})
                }
              }
              >
                {catagories}
              </button>
              </div>
          )
            }
          )
        
      </div>
 
 
 
           
    </div>
  )}
}
    
          
    

 
 
