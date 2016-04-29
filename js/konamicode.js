/**
 * Created by bobmac on 20/04/2016.
 */
$(document).ready(function(){

    var allowed = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b'
    };

    // The actual keys needed to activate the konami code
    var code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'a', 'b'];

    // counter to check the position of key presses
    var position = 0;

    document.addEventListener('keydown', function(e) {
        // gets the values for the specified key
        var key = allowed[e.keyCode];
       // gets value of the requried key from the code array
        var requiredKey = code[position];

        if (key == requiredKey) {

            // add one position to the position counter
            position++;

            // final key is pushed, function DoSomething() will run
            if (position == code.length)
                DoSomething();
        } else
            position = 0;
    });

    function DoSomething() {
        $(function() {
            var audio = new Audio("music/thugLife.mp3");
            audio.loop = true;
            audio.play();
          $("#lolz").one('load', function () {
            $(this).show("slide", { direction: "down" }, 4000);
            $("#snoop").show("slide", { direction: "down" }, 4000);
          }).each(function() {
            if(this.complete) $(this).load();
          });
        });
    }
});