import React from 'react';
import {createChart } from 'lightweight-charts';
import { request } from 'websocket';
 
let AlpacaConnection = async (socket,getcrypto,unsub,resetunsub) =>
{

    let crypto = getcrypto()
    const API_SECRET = 'twc7um8XPrlI9jseEnoxcS3WtAbMxKUnY5T0E1OQ'
    const API_KEY_ID = 'AKWGZ0SY08G1FN795SGN'; 
    let prev_crypto = {"action":"prev_crypto","trades":[crypto],"quotes":[crypto],"bars":[crypto]}
    const auth = {"action": "auth", "key": API_KEY_ID, "secret": API_SECRET};

    let subscribe = {"action":"subscribe","trades":[crypto],"quotes":[crypto],"bars":[crypto]};
    const news_subscription = {"action":"subscribe","news":[crypto]}

    let quotesElement = document.getElementById('quote');
    let tradesElement = document.getElementById('trade');
    let SymbolElement = document.getElementById('symbol');
    let pending_Close = false

    let start = new Date(Date.now() - (7200 * 1000)).toISOString();

    let key = [];
    let currentBar = [];
    let trades = [];
    let message 

    let chart = createChart(document.getElementById('chart'), 
    {
        width: 1000,
        height: 700,
        layout: 
        {
            backgroundColor: '#50575e',  
            textColor: '#ffffff',
        },
        grid: 
        {
            vertLines: 
            {
                color: '#404040',
            },
            horzLines: 
            {
                color: '#404040',
            },
        },
    
        priceScale: 
        {
            borderColor: '#cccccc',
        },
        timeScale: 
        {
            borderColor: '#cccccc',
            timeVisible: true,
        },
    });    
    let chartchildren = document.getElementById('chart').childNodes

    if(chartchildren.length > 2){
        let last_chart = chartchildren[chartchildren.length-2]
        last_chart.classList.add('hidden')
         
    }

    let candleSeries = chart.addCandlestickSeries();


/*     console.log(start); */


    var bars_url = (`https://data.alpaca.markets/v1beta1/crypto/${crypto}/bars?exchanges=CBSE&timeframe=1Min&start=`) + start;

    let fetch_api = await fetch(bars_url, 
    {
        headers: 
        {
            'APCA-API-KEY-ID': API_KEY_ID,
            'APCA-API-SECRET-KEY': API_SECRET
        }
    })
    
    let response = await fetch_api.json()

    
  


    if(response.bars !== null) 
        {
            const data_bars = response.bars.map(bar => 
                (
                    {
                        open: bar.o,
                        high: bar.h,
                        low: bar.l,
                        close: bar.c,
                        time: Date.parse(bar.t) / 1000
                    }
                ));
        
                currentBar = data_bars[data_bars.length-1];
        
                candleSeries.setData(data_bars);
                
        }

    else
    {
        console.log('No Data At the Moment')

        let now = new Date(new Date(Date.now()-7200 * 1000*3.5).toString())
        now = now.getTime()/1000
        currentBar = {'time':now}
        let empty_bar = [{o:0,h:0,l:0,c:0,t:now}]
        const data_bars = empty_bar.map(bar => 
            (
                {
                    open: bar.o,
                    high: bar.h,
                    low: bar.l,
                    close: bar.c,
                    time: bar.t
                }
            ));
        candleSeries.setData(data_bars)
    }

    socket.onmessage = (event) =>
    {

        let quit = unsub()
        if (quit === true && pending_Close === false){
            console.log('Send prev_crypto Emitted')
            socket.send(JSON.stringify(prev_crypto))
            pending_Close = true
            console.log('Reset Unsub Status')
            crypto = getcrypto()
            subscribe = {"action":"subscribe","trades":[crypto],"quotes":[crypto],"bars":[crypto]};
            socket.send(JSON.stringify(subscribe))
            
        }
        let data = JSON.parse(event.data);
        //console.log(data)
        //console.log(data)
            
        //console.log ( 'we in bby')

        if (data[0]['msg']  == 'connected')
        {
            message = 'connected'
            return socket.send(JSON.stringify(auth));
        };

        if (data[0]['msg'] == 'authenticated')
        {
            socket.send(JSON.stringify(subscribe));
            return message = 'authenticated'
        }
        for (let key in data)
        {
            let arr = []
            let keys = Object.keys(data)
            /* console.log(keys,'keys') */

            const type = data[key].T

            if (type == '')
            {
                //console.log(data[key]);
                let do_nothing
            }
            if (type == 'q')
            {
              /*   console.log(data[key]);  */  
                const quoteElement = document.createElement('div');
                quoteElement.className = 'quote';
                quoteElement.innerHTML = `<b style="color: green">${data[key].t}</b> <b style='color:red'>Bid Price</b> ${data[key].bp} <b style='color:red'>Ask Price</b> ${data[key].ap}`
                quotesElement.appendChild(quoteElement);

                let elements = document.getElementsByClassName('quote');
                if (elements.length > 25) 
                {
                    quotesElement.removeChild(elements[0]);
                }
            }
            if (type == 't') 
            {
                //console.log(data)
                const tradeElement = document.createElement('div');
                tradeElement.className = 'trade';
                tradeElement.innerHTML = `<b style="color: green">${data[key].t}</b>  <b style='color:red'>Trade Price</b>${data[key].p}   <b style='color:red'>Trade Size</b> ${data[key].s}`
                tradesElement.appendChild(tradeElement);

                let elements = document.getElementsByClassName('trade');
                if (elements.length > 25) 
                {
                    tradesElement.removeChild(elements[0]);
                }
                trades.push(data[key].p);
                
                let open = trades[0];
                let high = Math.max(...trades);
                let low = Math.min(...trades);
                let close = trades[trades.length - 1];

                candleSeries.update(
                {
                    time: currentBar.time + 60,
                    open: open,
                    high: high,
                    low: low,
                    close: close
                })
                //console.log('After first update')
                trades = [];
            }

                
            if (type == 'b' && data[key].x == 'CBSE') 
            { 
                let bar = data[key];
/*                console.log(bar.t,typeof(bar.t))
               console.log('\n\n GOT BAR DATA \n\n')  */

                let timestamp = new Date(bar.t).getTime() / 1000;
                currentBar = 
                {
                    time: timestamp,
                    open: bar.o,
                    high: bar.h,
                    low: bar.l,
                    close: bar.c
                }
                candleSeries.update(currentBar);
            }

        }
    }

            
};
export default AlpacaConnection;
 


