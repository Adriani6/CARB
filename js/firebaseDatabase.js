/**
 * Created by bobmac on 15/04/2016.
 */
var storage = undefined;
var userID = undefined;

var Database = {
    newDatabase: function(id){
        userID = id;
        storage = new Firebase("https://incandescent-inferno-6873.firebaseio.com/" + id);
    },
    addtoDatabase : function(tag){
        storage.push({
            id: userID,
            terms: tag
        });
    }
}

Database.newDatabase(12);