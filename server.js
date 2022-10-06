const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const client = require("./connection/postgreSQL.js")
const { postShp, getLiquidity_sell, getLiquidity_rent, getProperty_sell, getProperty_rent } = require("./controllers/shpController.js")

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json())
app.use('/liquidity-sell', getLiquidity_sell)
app.use('/liquidity-rent', getLiquidity_rent)
app.use('/property-sell', getProperty_sell)
app.use('/property-rent', getProperty_rent)

app.get('/', (req, res)=>{
	res.status(200);
	res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);

client.connect(err => {
	if (!err) {
		console.log('PostgreSQL Connected...')
	} else {
		console.log(err.message)
	}
})
