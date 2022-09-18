import {createChart } from 'lightweight-charts';
import { request } from 'websocket';
let AlpacaConnection2 = async (socket, get_data, setQuote, setTrade, setChart) =>
{
    const API_SECRET = '2mByl3Zt0UVtGUdK0cxp1OiR73IwmcA48CakzVsD'
    const API_KEY_ID = 'PKU6GC0U7ET0CQ10147W'; 

    const auth = {"action": "auth", "key": API_KEY_ID, "secret": API_SECRET};
    const subscribe = {"action":"subscribe","trades":["ETHUSD"],"quotes":["ETHUSD"],"bars":["ETHUSD"]};
    
    let quotesElement = document.getElementById('quote');
    let tradesElement = document.getElementById('trade');
    let SymbolElement = document.getElementById('symbol');
    
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
            backgroundColor: '#000000',
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

    let candleSeries = chart.addCandlestickSeries();
/*     console.log(start); */
    var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE&timeframe=1Min&start=' + start;

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

    else{
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
        let data = JSON.parse(event.data);
            
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
/*                 console.log(message) */
            const type = data[key].T

            if (type == 'q')
            {
                console.log(data[key]);   
                const quoteElement = document.createElement('div');
                quoteElement.className = 'quote';
                quoteElement.innerHTML = `<b style="color: green">${data[key].t}</b> <b style='color:red'>Bid Price</b> ${data[key].bp} <b style='color:red'>Ask Price</b> ${data[key].ap}`
                quotesElement.appendChild(quoteElement);

                let elements = document.getElementsByClassName('quote');
                if (elements.length > 40) 
                {
                    quotesElement.removeChild(elements[0]);
                }
            }
            if (type == 't') 
            {
                const tradeElement = document.createElement('div');
                tradeElement.className = 'trade';
                tradeElement.innerHTML = `<b style="color: green">${data[key].t}</b>  <b style='color:red'>Trade Price</b>${data[key].p}   <b style='color:red'>Trade Size</b> ${data[key].s}`
                tradesElement.appendChild(tradeElement);

                let elements = document.getElementsByClassName('trade');
                if (elements.length > 40) 
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
                console.log('After first update')
                trades = [];
            }

                
            if (type == 'b' && data[key].x == 'CBSE') 
            { 
                let bar = data[key];
                console.log(bar.t,typeof(bar.t))
                console.log('\n\n GOT BAR DATA \n\n')

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
export default AlpacaConnection2;
 


