import React, {useState, useEffect} from 'react';

let news_sources = ['nytimes.com','wsj.com','ft.com','cnbc.com','bloomberg.com','barrons.com','fortune.com','latimes.com','theguardian.com']
let catagories =['Economics','History','Business','CryptoCurrencies','Society','Science','Programing','Philosophy','Market','Computers',]
const NewsCatcher = (props) => {

    let [newsData, setNewsData] = useState([])
    let get_ndata = async ()  =>    
    { 
        console.log('\n Called \n')
        const current_date = Date.now();
        let yfinance =`https://api.newscatcherapi.com/v2/search?q=${'History'}&lang=en&published_date_precision=full&from=2022/05/08&to=2022/05/21&search_in=summary&sources=${'theguardian.com'}&ranked_only=true&from_rank=0&to_rank=500`;
                
        let fetch_api = await fetch(yfinance,
            {
                headers:
                {   
                method: 'GET',
                "x-api-key":'6bv6km1nBvFwUM6Zh7F1KHwaMvOMjg4tbWWD3cPu6H8'
                }
            })
        
        
            let data = await fetch_api.json()
            console.log(data['articles'])
            setNewsData(data['articles'])
    }
    useEffect(()=> 
    { 
        get_ndata()
        
    },[]);
 
            


    return(
        <div>
            <div  id= 'title'></div>
            <div>
                {
                    newsData.map((news_articles,index) => 
                    <div key={index}>
                        
                        <center> 
                            <h2 className='news_headline'>{news_articles.title} </h2>
                        </center>
                        <img className='news_url' src= {news_articles.media}></img>
                        <a className='news_url' src='' >{news_articles.link}</a>
                        <center> 
                        <p className ='news_discription'>{news_articles.summary} </p>
                        </center>
                        
                            <div className ='news_author'>By:{news_articles.author}  </div>  
                    </div>
            
                )} 
            </div>
                
        </div>
      
     ) 
 }

 export default NewsCatcher;