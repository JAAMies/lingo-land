AFRAME.registerComponent('move-on-click', {

  init: function() {
    this.el.addEventListener('click', function() {
      var newPosition = '29 3.50 1';
      var sceneEl = document.querySelector('a-scene');
      sceneEl.querySelector('#player').setAttribute('position', newPosition);
    });
  }
});
