const { MongoClient } = require('mongodb');
const cfg = require('./dbConfig.json');

const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;

const client = new MongoClient(url);
const db = client.db('startup');

client
 .connect()
 .then(() => db.command({ ping: 1 }))
 .catch((ex) => {
   console.log(`Error with ${url} because ${ex.message}`);
   process.exit(1);
 });

 const collection = 'test';
 const scoreCollection = db.collection(collection);

 scoreCollection.insertOne({ name: 'tim', score: 42 });
 
 scores = [
  { name: 'ryan', score: 3 },
  { name: 'holowaychuk', score: 83 },
 ];
 scoreCollection.insertMany(scores);


// Object based queries
//  db.house.find()
//  db.house.find({beds:{$gte:2}})
//  db.house.find({status:"open",beds:{$lt: 3}})
//  db.house.find({$or:[beds:{$lt: 3},price:{$lt:1000}]})
//  db.house.find({summary:/(modern|beach)/i})

async function query(){
//Querying data
const query = { score: { $gt: 10 } };
const options = {
  sort: { score: -1 },
  limit: 10,
};

const cursor = scoreCollection.find(query, options);
const result = await cursor.toArray();
result.forEach((i) => console.log(i));
}

query();

