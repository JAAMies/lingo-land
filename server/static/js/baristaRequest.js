
AFRAME.registerComponent('barista-request', {

    init: function () {
        let barista = document.getElementById('barista');
        barista.addEventListener('click', function () {
            this.setAttribute('material', 'color:green')
            let data = { usersays: 'cafe' }
            fetch('/barista', {
                method: 'PUT',
                body: JSON.stringify(data),
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
