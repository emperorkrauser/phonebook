import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PW = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@phonebook.5hk3r.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
});
export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export const MongoServer = run().catch(console.dir);
