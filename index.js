const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cacihg8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db('toyUser').collection('addToy')

    //All Toys

    //category
    app.get("/allToys/:text", async(req, res) =>{
        // console.log(req.params.text)
        if(req.params.text == "sportsCar" || req.params.text == "fireTruck" || req.params.text == "policeCar"){
          const result = await toyCollection.find({subcategory: req.params.text}).toArray()
          res.send(result)
          return
        }
        const result = await toyCollection.find({}).toArray()
        res.send(result)
      })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('toy car server is running')
})

app.listen(port, () =>{
    console.log(`car server is running on port ${port}`)
})