AFRAME.registerComponent('move-on-click', {

    init: function () {
        this.el.addEventListener('click', function () {
            var newPosition = '21 3.2 0';
            var sceneEl = document.querySelector('a-scene');
            sceneEl.querySelector('#player').setAttribute('position', newPosition);
        });
    }
});