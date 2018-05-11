function onConnected(){
}

AFRAME.registerComponent('spawn-facing',{
  init:function(){
  let playerEl = document.createElement('a-entity');
  playerEl.setAttribute('id','player');
  playerEl.setAttribute('networked','template','#avatar-template');
  playerEl.setAttribute('networked','showLocalTemplate','false');
  playerEl.setAttribute('camera','');
  playerEl.setAttribute('cursor','');
  playerEl.setAttribute('wasd-controls','');
  playerEl.setAttribute('look-controls','');
  setTimeout(function(){
  let scene = document.querySelector('a-scene');
  console.log(NAF.entities.entities);
  console.log(Object.keys(NAF.entities.entities));
  let playerNumber = Object.keys(NAF.entities.entities).length;
  console.log(playerNumber);

  //let player = document.querySelector('#player');

  if(playerNumber==0){
    playerEl.setAttribute('position','-1 1.6 -1');
    playerEl.setAttribute('rotation','0 -90 0');
  }else if(playerNumber==1){
    playerEl.setAttribute('position','1 1.6 -1');
    playerEl.setAttribute('rotation','0 90 0');
  }else{
    playerEl.setAttribute('position','3 1.6 -1');
    playerEl.setAttribute('rotation','0 0 0');
  }
  scene.appendChild(playerEl);
},3000);

  }
});
