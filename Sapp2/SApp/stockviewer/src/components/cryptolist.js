import React from 'react';
import {useEffect , useState} from 'react';
import { w3cwebsocket as websocket } from "websocket";
import { request } from 'websocket';
const crypto_api = '966bab8576315a5977c6f37beb2bb1764cb23c0d'

 


 
let CryptoList1 = ()    => 

{
 
    let [finance, setFinance ] = useState({}) ;

    let get_ldata = async() =>
    {
        let yfinance = ("https://api.coinmarketcap.com/data-api/v3/map/all?cryptoAux=is_active,status&exchangeAux=is_active,status&listing_status=active,untracked")
            
        let fetch_api = await fetch(yfinance,
            
    )
        let data = await fetch_api.json()
        console.log(data)

        setFinance(data['data'])

     }
        
          
          
        
     
        useEffect(() => 
        {
            get_ldata()
        },[]);
     
 
            return(
                <div>
               
            <div>
                  
                
                    <div >
        
                    </div>
                
                     
            </div>
                    
            </div>
        ) 

}
export default CryptoList1;