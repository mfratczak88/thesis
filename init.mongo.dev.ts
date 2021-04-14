import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { MongoClient } from 'mongodb';

const env = dotenv.config();
dotenvExpand(env);


const client = new MongoClient(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createCollections(db, ...collections) {
  for (const collection of collections) {
    await db.createCollection(collection);
  }
}

async function run() {
  try {
    await client.connect();
    const db = await client.db(process.env.MONGO_DB);
    await createCollections(db,
      'users',
      'invitations',
      'students',
      'professors',
      'thesis',
      'studies',
      'exams',
    );

    await db.collection('users').insertOne({

    })
  } finally {
    await client.close();
  }
}

run().catch(reason => {
  throw new Error(reason);
});