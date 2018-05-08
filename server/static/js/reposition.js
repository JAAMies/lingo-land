
AFRAME.registerComponent('reposition-on-click', {
    schema: {
        lol: { default: '0 0 0' }
    },

    init: function () {
        this.el.addEventListener('click', function () {
            var goThere = this.getAttribute('position');
            var sceneEl = document.querySelector('a-scene');
            sceneEl.querySelector('#player').object3D.position.set(goThere.x, goThere.y + 2, goThere.z);
            sceneEl.querySelector('a-camera').object3D.position.set(goThere.x, goThere.y + 2, goThere.z);
        });
    }
});
