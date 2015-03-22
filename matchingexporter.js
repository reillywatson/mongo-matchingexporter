var objectContainsValue = function(obj, val) {
	for (var property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (typeof obj[property] == "object") {
				if (objectContainsValue(obj[property], val)) {
					return true;
				}
			} else {
				if (obj[property] === val) {
					return true;
				}
			}
		}
	}
	return false;
};
var getMatchingDocuments = function(val) {
	var mongo = new Mongo();
	var results = []
	var dbNames = mongo.getDBNames();
	for (var dbNo = 0; dbNo < dbNames.length; dbNo++) {
		var db = mongo.getDB(dbNames[dbNo]);
		var collectionNames = db.getCollectionNames();
		for (var collectionNo = 0; collectionNo < collectionNames.length; collectionNo++) {
			var collection = db.getCollection(collectionNames[collectionNo]);
			var cursor = collection.find();
			cursor.forEach(function(obj) {
				if (objectContainsValue(obj, val)) {
					results.push(obj);
				}
			});
		}
	}
	return results;
};
printjson(getMatchingDocuments("partner_user_id"));