/**
 * Created by bobmac on 20/04/2016.
 */

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
    var result = document.getElementById("lolz");
    result.innerHTML = "<img src='img/corrieLolSoz.gif' id='corrieDaKing' alt='corrie' height='200px' width='300px'/>";

    //var img = document.createElement('img');
    //img.src = "images/corrieLolSoz.gif";
    //document.body.appendChild(img);
    alert("Soz corrie");
}