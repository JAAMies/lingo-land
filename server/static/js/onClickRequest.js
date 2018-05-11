
AFRAME.registerComponent('on-click-request', {

    init: function () {
        let barista = document.getElementById('barista');
        barista.addEventListener('click', function () {
            this.setAttribute('material', 'color:green')

            fetch('/barista', {
                method: 'PUT',
                body: JSON.stringify({ usersays: 'cafe' }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => response.json())
                .then(response => console.log('Success:', response))
                .catch(error => console.error('Error:', error))
        })
    }
});
