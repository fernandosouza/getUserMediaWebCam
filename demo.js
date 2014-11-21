var canvas = document.querySelector("#output");
var ctx = canvas.getContext("2d");

var image = new Image();
	image.src = "frame.png";

function print(){
	var video = document.getElementsByTagName('video')[0]; 
	ctx.drawImage(video, 0, 0, video.width, video.height);
	ctx.drawImage(image, 0, 0, video.width, video.height);
}

function applyCanvas () {
	ctx.drawImage(image, 0, 0);
}

document.getElementById("print").addEventListener('click', function () {
	print();
});


var App = {
	options: {
		"audio": false,
	    "video": true,

	    // the element (by id) you wish to use for 
	    // displaying the stream from a camera
	    el: "webcam",

	    extern: null,
	    append: true,

	    // height and width of the output stream
	    // container

	    width: 500, 
		height: 377,

	    // the recommended mode to be used is 
	    // 'callback ' where a callback is executed 
	    // once data is available
	    mode: "callback",

	    context: '',

	    // the flash fallback Url
	    // swffile: "fallback/jscam_canvas_only.swf",

	    // quality of the fallback stream
	    // quality: 85,

	    // a debugger callback is available if needed
	    debug: function () {},

	    // callback for capturing the fallback stream
	    onCapture: function () {
	        window.webcam.save();
	    },

	    // callback for saving the stream, useful for
	    // relaying data further.
	    onSave: function (data) {},
	    onLoad: function () {}
	}
}

getUserMedia(
	App.options, 
	function(stream){
		if (App.options.context === 'webrtc') {

			var video = App.options.videoEl;
			
			if ((typeof MediaStream !== "undefined" && MediaStream !== null) && stream instanceof MediaStream) {
	
				if (video.mozSrcObject !== undefined) { //FF18a
					video.mozSrcObject = stream;
				} else { //FF16a, 17a
					video.src = stream;
				}

				return video.play();

			} else {
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
			}

			video.onerror = function () {
				stream.stop();
				streamError();
			};

		} else{
			// flash context
		}
	},
	function(){
		console.log('error');
	}
);