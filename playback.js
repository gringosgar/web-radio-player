var sources = [
  "http://ice5.somafm.com/reggae-128-mp3", // Heavyweight
  "https://s3.radio.co/s17a162fcf/listen", // Riddim Lion 
  "http://partyviberadio.com:8000/;listen.pls?sid=1", // pvr Reggae
  
];

var labels = [
  [ "Heavyweight Reggae", "https://somafm.com/reggae/" ],
  [ "Riddim Lion Radio", "https://www.riddimlionradio.com/"],
  [ " pvr Reggae", "https://www.partyvibe.com/reggae-radio-station/"],
 
];

var playingIndex = 0; // current radio
var playing = true; // stream status
var music = null;

setTimeout(function(){
    loadStream(playingIndex);
}, 1);

function loadStream(index){
  if(playing && music !== null)
    destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  pauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream(){
  music.pause();
  music.src = "";
  playIcon();
  playing = false;
}

function changePlayback(){
  if(playing){ destroyStream();  }else{  loadStream(playingIndex);  }
}

function setLabel(index){
  document.getElementById("label").innerHTML = '<h6> <a target="_blank" href="' + labels[index][1] + '">' + labels[index][0] + '</a></h6>';
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 32:
      changePlayback();
    break;
  }
};

// icons
function pauseIcon(){
  document.getElementById('playbackButton').className = 'icon fa-pause';
}
function playIcon(){
  document.getElementById('playbackButton').className = 'icon fa-play';
}
