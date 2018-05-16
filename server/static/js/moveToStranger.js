AFRAME.registerComponent('move-to-stranger', {

  init: function() {
    this.el.addEventListener('click', function(e) {
      console.log("this", this)
      // var newPosition = "18.42 1.8 -3.48";
      // var sceneEl = document.querySelector('a-scene');
      var player = document.getElementById('player');
      player.setAttribute("position", "18.42 1.8 -3.48");
    });
  }
});
