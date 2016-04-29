/**
 * Created by bobmac on 15/04/2016.
 */

 //Database constructor
    function Database(fbid){
        this.fbid = fbid;
        this.storage = new Firebase("https://incandescent-inferno-6873.firebaseio.com/" + fbid);
    }
    //Object function addTag, which adds a tag to database
    Database.prototype.addTag = function(tag){
        this.storage.push(tag);
    };
    //Gets tags from database
    Database.prototype.getTags = function(){
        var tags = [];
        this.storage.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if($.inArray(childData, tags) < 0)
                    tags.push(childData);                
            });
            for(var tag in tags){
                var f = functions.start(tag);
                var query = $.when(f).done(function(){  
                    for(var i = 0; i < 10; i++){
                        functions.appendImages(app.json[i]);
                    }
                    var hexo = $("#instaWrapper").html();
                    $("#instaWrapper").remove();
                    $("#images").append(hexo);
                    $('.honeycombs').honeycombs();
                    functions.loaderStop();                         
                });
            }
        });
    };
    //Sets new user field in the database.
    Database.prototype.setUser = function(){
        this.storage.set(this.fbid);
    }
    //Gets database instance.
    Database.prototype.getDBO = function(){
        return this.storage;
    }