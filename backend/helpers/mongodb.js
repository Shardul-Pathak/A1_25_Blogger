const MongoClient = require( 'mongodb' ).MongoClient;
// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'db_bloggerv1';

let connectDB = async function( callback ) {
    try{
        await client.connect();
        console.log('Connected mongodb to server');
        return client.db(dbName);
    }catch(err){
        console.log(err);
    }
}

module.exports = { connectDB };