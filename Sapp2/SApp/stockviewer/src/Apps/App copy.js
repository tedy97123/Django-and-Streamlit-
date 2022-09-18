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

export class App extends React.Component 
{
  constructor()
  {
    super(props);
    this.state = {change:true};
  }
    render() {
      activechart = useState({});
      crypto = useState('BTCUSD');
      chart = useState({});
      News = useState({});
      trade = useState({});
      quote = useState({});
      Data= useState({});
      finance = useState({}); 
      count=useState(0);
      ubstatus = useState(false);
    }
  } 

  let current_Crypto = () => {
    return crypto
  }

  let getUnsub = () => {
  }


  let get_data = (data) => {
    setData(data);

  }
  useEffect (() =>{
  socket =  new websocket (url);
  console.log('this is first call ',crypto)
  AlpacaConnection(socket, this.state.Data , this.state.quote, this.state.trade , this,state.chart ,this.state.chart, 'ETHUSD', this.state.ubstatus);
 },[])

 useEffect (() =>{
  socket =  new websocket (url);

/*   News(set_News); */
 },[])

 useEffect (() =>{
  console.log('\n\n',crypto,'\n\n this is crypto',count, substatus)
   if(socket !== null){
     return console.log('socket exists')
   }
    socket =  new websocket (url);

    //AlpacaConnection(socket, get_data, setQuote, setTrade, setChart,setNews,current_Crypto,getUnsub);
   setCrypto(crypto+=1)
 },[crypto])
  

    (
     <div> 
       <div>{}</div>
       <img style={{'marginLeft':'1200px'}}className='resize'src={logo} alt="logo"  />
         
          {/* <input type="search" id="site-search" name="q" style={{marginLeft:5}}></input> */}
          <div className="cryptolist">
            {
              cryptolist.map(
                (c,index)=> 
                <div className="cryptoitem" key={index}>
                  <button onClick = {(e) => {if(socket !== null){console.log(socket);socket = null}; setSubStatus(true) ;setCrypto(e.target.innerHTML)}}>{c}</button>
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
            <News />
            <NewsCatcher/>
            
      </div>
    
          
    

  );
 

export default App;
