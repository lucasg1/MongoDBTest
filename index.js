var part = require('./part.json')
console.log(part.length)

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany( part , function(err, result) {
      assert.equal(err, null);
      assert.equal(10, result.result.n);
      assert.equal(10, result.ops.length);
      console.log("Inserted 10 documents into the collection");
      callback(result);
    });
}

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

var updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });  
}

var removeDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 2 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
  }

//Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    //insertDocuments(db, function() { db.close() });
    findDocuments(db, function() { db.close() });
    //updateDocument(db, function() { db.close() });
    //removeDocument(db, function() { db.close() });
  });