import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGO_URI
if (!uri) {
	throw new Error('MONGO_URI environment variable is not defined')
}

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

const options = {
	maxPoolSize: 10,
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
