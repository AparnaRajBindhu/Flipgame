$(document).ready(function(){
	
var checkArray = []; // checking if both clicked fields are the same fruit
var idCheck = []; //  array for storing clicked fields IDs
var counter = 0;
var end = 0; // for detecting if all fields are done
var fields = document.querySelectorAll(".back");
/*var natureSound = new Audio("http://k003.kiwi6.com/hotlink/2ai7iwz2j6/nature.mp3");
var spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");
var win = new Audio("http://k003.kiwi6.com/hotlink/eptlrqspgk/win.mp3");*/


var images = [
    
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692132/ananas_uukegu.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/apple_khwnkz.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/apricot_bvge7o.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/banana_xks3tr.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/cake_pqvm0z.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/cherry_gtzbks.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/grapes_wshdtl.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/lemon_hfksjg.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/pear_vdpyqc.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/plum_rncxxc.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/strawberry_yr6sa1.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692134/watermelon_wfzuz8.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692132/ananas_uukegu.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/apple_khwnkz.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/apricot_bvge7o.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/banana_xks3tr.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/cake_pqvm0z.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/cherry_gtzbks.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/grapes_wshdtl.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/lemon_hfksjg.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/pear_vdpyqc.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/plum_rncxxc.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692133/strawberry_yr6sa1.png",
	"https://res.cloudinary.com/nikola1970/image/upload/v1456692134/watermelon_wfzuz8.png"
];

    
    // @description game timer
                                var second = 0, minute = 0; hour = 0;
                                var timer = document.querySelector(".timer");
                                var interval;
                                function startTimer(){
                                    interval = setInterval(function(){
                                        timer.innerHTML = minute+"mins "+second+"secs";
                                        second++;
                                        if(second == 60){
                                            minute++;
                                            second=0;
                                        }
                                        if(minute == 60){
                                            hour++;
                                            minute = 0;
                                        }
                                    },1000);
}

function clicked() { 
	if ($(this).find(".inner-wrap").hasClass("flipped")) {
		return;
	}
	$(this).find(".inner-wrap").toggleClass("flipped");
	checkArray.push($(this).find("img").attr("src"));
	idCheck.push($(this).attr("id"));
	check();
}

$(".field").on("click", clicked);
	

function restart() {
	$(".back").find("img").remove(); //remove all current images from the field
	$(".field .inner-wrap").removeClass("flipped"); // remove flipped class so they can flip back again at the starting position
	checkArray = []; // empty check array
	idCheck = []; // empty IDs check array
	counter = 0; // reset counter
	end = 0; // reset ending variable
    second = 0;
    minute = 0; 
    hour = 0;
	startGame();
}

function checkEnd() {
	if (end === 24) { //if all 24 fields are uncovered 
		//win.play();
        scoreboard();
		/*alert("Game is over! Your score is " + counter);
		restart();*/
	}
}

function shuffleArray(array) { // shuffle array with images
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function startGame() {

	//natureSound.play(); // play the background music

	var arr = shuffleArray(images); // stores the array of shuffled images

	for (var i = 0; i < fields.length; i++) { // appending those images to the div with class "back"
		var img = document.createElement("img");
		img.src = arr[i];
		fields[i].appendChild(img);
	}


}

function check() {
	if (checkArray.length === 2) { // if fields are clicked 2 times we are doing check
		$(".field").off("click", clicked); // disabling click event to prevet shit
		setTimeout(function(){
			if (checkArray[0] !== checkArray[1]) { // if there is  no match
				$("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
				$("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // second one flip back as well
				counter++;
				checkArray = []; //empty checking array for the next 2 clicks
				idCheck = []; // same with this one
                //start timer on first click
                                                    if(counter == 1){
                                                        second = 0;
                                                        minute = 0; 
                                                        hour = 0;
                                                        startTimer();
                                                    }
				$(".field").on("click", clicked); // bind the click back again
			} else {
				//spark.play();
				counter++;
				end += 2; // if there is a match "end" is raised by 2 as 2 fields are uncovered
				checkArray = []; // empty array for the next try
				idCheck = []; // this one as well
				checkEnd(); // check if game has eneded
				$(".field").on("click", clicked); // bind click again
			}
			document.querySelector(".counter").innerHTML = counter;
		}, 800);	
	}
}

function logout(){
  var c = confirm("Are you sure you want exit ?")
  if(c){
      window.location = "login.html"
    }
}
function scoreboard(){
      
      window.location = "score.html"
   
}
startGame();

});