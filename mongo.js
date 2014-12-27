var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Mongo Connection URL
var mongoUrl = 'mongodb://localhost:27017/pagas';

module.exports = {
  insert: function(collectionName, insertData, callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      var collection = db.collection(collectionName);

      collection.insert(insertData, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the document collection");
        callback(result);
      });
    });
  },
  update: function(collectionName, targetData, updateData, callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      var collection = db.collection(collectionName);

      collection.update(targetData, {$set: updateData}, function(err, result) {
        assert.equal(err, null);
        console.log("Updated the document with the field a equal to " + updateData);
        callback(result);
      });
    });
  },
  remove: function(collectionName, removeData, callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      var collection = db.collection(collectionName);

      collection.remove(removeData, function(err, result) {
        assert.equal(err, null);
        console.log("Removed the document with the field a equal to " + removeData);
        callback(result);
      });
    });
  },
  find: function(collectionName, criteria, callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      var collection = db.collection(collectionName);

      collection.find(criteria).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
      });
    });
  }
}
