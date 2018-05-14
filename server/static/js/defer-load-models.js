window.setTimeout(function () {
    var diner = document.createEvent('a-entity');
    var jack = document.createEvent('a-entity');
    var scott = document.createEvent('a-entity');

    diner.setAttribute('obj-model', "mtl: #diner-mtl; obj: #diner-obj")
    diner.setAttribute('position', "16 0 0");
    diner.setAttribute('rotation', "0 90 0");

    // jack.setAttribute('obj-model', "");
    // diner.setAttribute('position', "16 0 0");
    // diner.setAttribute('scale', "16 0 0");
    // diner.setAttribute('rotation', "0 90 0");

    // scott.setAttribute('obj-model', "");


}, 3000)