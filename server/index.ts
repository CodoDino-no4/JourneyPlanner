import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 8000
const client: mongodb.MongoClient = new mongodb.MongoClient(process.env.DB_URI, {maxPoolSize: 50, writeConcern: {wtimeout: 2500},});

await client.connect()
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    }
)});