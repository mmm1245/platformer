var pl;

var platforms;

var name = "Player" + Math.floor(Math.random()*100);

var socket;

var otherPlayers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pl = new Player(55, -100);
  platforms = [];

  socket = io();

  socket.on('platform-add', (platform) => {
    platforms.push(new Platform(platform.x, platform.y, platform.w, platform.h, loadImage('assets/platform1.png'), pl, platform.mode));
  });

  socket.on('player-pos', (player) => {
      var done = false;
      for(var i = 0;i < otherPlayers.length;i++){
        if(otherPlayers[i].name === player.name){
          otherPlayers[i].pl.pos.x = player['x'];
          otherPlayers[i].pl.pos.y = player['y'];
          otherPlayers[i].pl.directionRight = player['directionRight'];
          done = true;
        }
        
      }
      if(!done)
        otherPlayers.push({'name':player.name,'pl':new Player(player.x, player.y)});
  });
  socket.on('disconnect', (player) => {
      otherPlayers = [];
  });
  socket.on('restart', (player) => {
      otherPlayers = [];
      platforms = [];
      pl.pos = createVector(55, -100);
  });
  socket.on('changename', (namech) => {
      for(var i = 0;i < otherPlayers.length;i++){
        if(otherPlayers[i].name == namech.before){
          otherPlayers[i].name = namech.after;
        }
      }
  });
  socket.on("platform-remove", (id) => {
    platforms.remove(id);
  });
}

function draw() {
  background(220);
  pl.draw();
  pl.update();
  for(var i = 0;i < otherPlayers.length;i++){
    if(otherPlayers[i].name === name)
      continue;
    otherPlayers[i].pl.drawAnother(pl,otherPlayers[i].name);
  }
  pl.onGround = false;
  platforms.forEach(element => {
    element.render();
    if(element.collideTop(pl)){
      pl.velY = 0;
      pl.onGround = true;
      if(element.platformmode == -1){
      pl.pos = createVector(55, -100);
    }
    if(element.platformmode == 1){
      socket.emit("win", name);
    }
    }
    if(element.collideBottom(pl)){
      pl.velY = -1;
    }
  });

  if(pl.pos.y > 3000){
    pl.pos = createVector(55, -100);
  }

  socket.emit("player-pos", {'x':pl.pos.x,'y':pl.pos.y,'name':name,'directionRight':pl.directionRight});

  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeName(newname){
  socket.emit("changename", name, newname);
  name = newname;
}
