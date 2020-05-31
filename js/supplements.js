API_URL = 'http://78.46.244.156/api/'

window.onload = function () {
    let request = new XMLHttpRequest()
    request.open("GET", API_URL + "supplements", false);
    request.send();
    let data = JSON.parse(request.responseText)
    console.log(data)
    let supplement_container = document.getElementById('supplement-container')
    for (let i = 0; i < data.length; i++) {
        let elem = document.createElement('DIV')
        elem.className = 'supplement'
        elem.innerText = data[i]['name']
        if (data[i]['e_code']) {
            elem.innerText += ' (E' + data[i]['e_code'] + ')'
        }
        elem.onclick = function () {
            resetColors()
            elem.style.backgroundImage = 'linear-gradient(to right, #b477ff, white)'
            showDetails(data[i])
        }
        supplement_container.appendChild(elem)
    }
}

function showDetails(supplement) {
    let request = new XMLHttpRequest()
    request.open("GET", API_URL + "classes/" + supplement['class_id'], false);
    request.send();
    let data = JSON.parse(request.responseText)
    console.log(data)
    let class_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "purposes/" + supplement['purpose_id'], false);
    request.send();
    data = JSON.parse(request.responseText)
    console.log(data)
    let purpose_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "supplements/" + supplement['id'] + "/side-effects", false);
    request.send();
    data = JSON.parse(request.responseText)
    console.log(data)
    let side_effects = []
    for (let i = 0; i< data.length; i++) {
        side_effects.push(data[i]['name'])
    }
    document.getElementById('supplement-class').innerText = class_name
    document.getElementById('supplement-purpose').innerText = purpose_name
    document.getElementById('supplement-side-effects').innerText = side_effects.join(', ')
}

function resetColors() {
    let children = document.getElementById('supplement-container').children
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundImage = 'linear-gradient(to right, #4f8aff, white)'
    }
}