const express = require("Express")
const app = express()
app.use(
    cors({
        origin:"https://api.nomics.com/v1/markets/candles?key=your-key-here&interval=1d&base=ETH&quote=BTC&start=2018-04-14T00:00:00Z&end=2018-05-14T00:00:00Z"
    })
)

app.get()