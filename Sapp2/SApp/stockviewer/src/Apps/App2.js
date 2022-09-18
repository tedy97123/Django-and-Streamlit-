import React from 'react';
import './CSS/App.css';
import AlpacaConnection2 from '../components/Coinbase';
import { w3cwebsocket as websocket } from "websocket";
import {useEffect , useState} from 'react';
import './CSS/stocklist.css'
import './CSS/style.css';



let socket =  null ;
const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'

function App2() {
  const [chart, setChart] = useState({});
  const [order, setOrder] = useState({});
  const [trade,setTrade] = useState({});
  const [quote, setQuote] = useState({});
  const [Data, setData ]= useState({});
  let get_data = (data) => {
    setData(data);
  }
  useEffect (() =>{
  socket =  new websocket (url);
  AlpacaConnection2(socket, get_data, setQuote, setTrade, setChart);
 },[])

  return (
     <div> 
        <div style={{fontSize:28 , bold:true ,fontFamily:'Papyrus' ,marginLeft:1145 }}>Stock Tracker</div>
        <label for="site-search" style={{marginLeft:985}}>Search for CryptoCurrencies:</label>
          <input type="search" id="site-search" name="q" style={{marginLeft:5}}></input>
          <button style={{marginLeft:10}}>Search</button>
          <div className= "stocklist_wrapper">     
            <div className="stocklist_main flex_inner_row">     
              <div className="stocklist_row_div" id = 'quote'>Quote</div>      
              <div className="stocklist_row_div" id= 'chart'  > Chart</div>     
              <div className="stocklist_row_div" id ='trade'  >Trades</div>     
            </div>    
          </div>
          
    </div>

  );
}

export default App2;
