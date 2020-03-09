var cafesCollection = db.collection('cafes');
var cafelist = document.querySelector('#cafe-list');
var form = document.querySelector('#add-cafe-form');

//CREATE ELEMENT RENDER FOR CAFE
function renderCafe(doc) {

    var li = document.createElement('li');
    var name = document.createElement('span');
    var city = document.createElement('span');
    var cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);

    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafelist.appendChild(li);

    //DELETING DATA
    cross.addEventListener('click', function(e) {
        e.stopPropagation();
        var id = e.target.parentElement.getAttribute('data-id');
        cafesCollection.doc(id).delete();
    });
}

//GETTING DATA
cafesCollection /*.where('city', '==', 'manchester')*/ /*.orderBy('name')*/ .get().then(function(snapshot) {
    snapshot.docs.forEach(function(doc) {
        renderCafe(doc);
    });
});

//SAVING DATA
form.addEventListener('submit', function(e) {
    e.preventDefault();
    cafesCollection.add({
        name: form.name.value,
        city: form.city.value
    }).then(function() {
        form.name.value = '';
        form.city.value = '';
    });
});