AFRAME.registerComponent('move-to-stranger', {

  init: function () {
      this.el.addEventListener('click', function () {
          var newPosition = '18.42 1.8 -3.48';
          var sceneEl = document.querySelector('a-scene');
          sceneEl.querySelector('#player').setAttribute('position', newPosition);
      });
  }
});