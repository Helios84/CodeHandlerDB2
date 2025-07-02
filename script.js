const DATA_URL = 'users.json';

// HTML elements
const select = document.getElementById('userSelect');
const btn    = document.getElementById('rememberBtn');
const list   = document.getElementById('savedList');

let users = []; 


function addToList(name) {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
}


document.addEventListener('DOMContentLoaded', async () => {
    // 1) fetch users once
    const res   = await fetch(DATA_URL);
    users = await res.json();        // array of objects

    // 2) build <option> for each user
    users.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;            // use id as key
        opt.textContent = u.name;    // text = user name
        select.appendChild(opt);
    });

    // 3) load saved users from LocalStorage
    const saved = JSON.parse(localStorage.getItem('savedUsers')) || [];
    saved.forEach(u => addToList(u.name));
});

// REMEMBER button
btn.addEventListener('click', () => {
    const id = select.value;
    if (!id) return;                         // nothing chosen

    const user = users.find(u => u.id == id);
    if (!user) return;

    // get current saved list or empty array
    const saved = JSON.parse(localStorage.getItem('savedUsers')) || [];

    // avoid duplicates by id
    if (!saved.some(u => u.id == user.id)) {
        saved.push(user);                                // add full object
        localStorage.setItem('savedUsers', JSON.stringify(saved));
        addToList(user.name);                            // update UI
    }
});