const MongoClient = require('mongodb').MongoClient;
const url = 
'mongodb+srv://admin:EzZ99JeRsZX0OlDP@cluster0.3goci4p.mongodb.net/?retryWrites=true&w=majority';
//const url         = 'mongodb://localhost:27017';
let db            = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
        console.log("Connected successfully to db server");

        db = client.db('badbank');
});

function create(name, email, password) {
        return new Promise((resolve, reject) => {
                const collection = db.collection('users');
                const doc = {name, email, password, balance: 0};
                collection.insertOne(doc, {w:1}, function(err, result) {
                        err ? reject(err) : resolve(doc);
                });
        })
}

function all(){
        return new Promise((resolve, reject) => {
                const customers = db
                        .collection('users')
                        .find({})
                        .toArray(function(err, docs) {
                                err ? reject(err) : resolve(docs);
                        });
        })
}

function find(email) {
        return new Promise((resolve, reject) => {
                const customers = db
                        .collection('users')
                        .find({email: email})
                        .toArray(function(err, docs) {
                                err ? reject(err) : resolve(docs);
                        });
        })

}

function findOne(email) {
        return new Promise((resolve, reject) => {
                const customers = db
                        .collection('users')
                        .findOne({email: email})
                        .then((doc) => resolve(doc))
                        .catch((err) => reject(err));
                        });
        }

function update(email, amount) {
        return new Promise((resolve, reject) => {
                const customers = db
                        .collection('users')
                        .findOneAndUpdate(
                                {email: email}, 
                                {$inc: {balance:amount}},
                                {returnOriginal: false}, 
                                function(err,documents) {
                                        err ? reject(err) : resolve(documents);
                                }
                        );
        });
}



module.exports = {create, all, find, findOne, update};