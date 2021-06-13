const express = require('express')
const fetch = require('node-fetch')
const MongoClient = require('mongodb').MongoClient
const app = express()
const uri = 'YOUR MONGODB URL HERE'
// mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
// .then((result)=>app.listen(3000))
// .catch((err)=>console.log(err));

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
async function getOptions (ticker) {
  try {
    const header = {
      Authorization: ' '
    }
    const response = await fetch(
      `https://api.tdameritrade.com/v1/marketdata/chains?apikey=<TDA API KEY GOES HERE>&symbol=${ticker}&range=ALL`,
      { method: 'GET', headers: header }
    )
    if (response.ok) return response.json()
  } catch (err) {
    console.error(err)
  }
}

async function run (ticker) {
  const optionsData = await getOptions(ticker)
  console.log(optionsData)
  try {
    // Connect the client to the server

    await client.connect()
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 })
    console.log('Connected successfully to server')
    const database = client.db('OptionsChain')
    const Options = database.collection(ticker)
    for (const [key, value] of Object.entries(optionsData['callExpDateMap'])) {
      for (const [key2, value2] of Object.entries(value)) {
        temp = value2[0]
        temp['ticker'] = ticker

        const result = await Options.insertOne(temp)
        console.log(result)
      }
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
const args = process.argv.slice(2)
run(args[0]).catch(console.dir)

// (async () => {
//     const options = await getOptions();
//      for (const [key,value] of Object.entries(options["callExpDateMap"])){
//              for (const [key2,value2] of Object.entries(value)){
//             console.log(value2[0]);
//     }
//      }
//   })();
