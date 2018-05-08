
AFRAME.registerComponent('reposition-on-click', {

    init: function () {
        this.el.addEventListener('click', function () {
            var goThere = this.getAttribute('position');
            var newY = Math.floor(goThere.y + 2), newX = Math.floor(goThere.x), newZ = Math.floor(goThere.z)
            //for house entry, add extra to x and z (depending) so player is able to enter the house directly  
            var x = newX.toString(), y = newY.toString(), z = newZ.toString();
            var newPosition = x + ' ' + y + ' ' + z;

            var sceneEl = document.querySelector('a-scene');
            sceneEl.querySelector('#player').setAttribute('position', newPosition);
            sceneEl.querySelector('a-camera').setAttribute('position', newPosition);
        });
    }
});
