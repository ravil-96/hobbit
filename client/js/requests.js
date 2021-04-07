const { renderHabits } = require('./habits');

async function postHabit(e){
    e.preventDefault();
    try {
        let formData = new FormData(e.target)
        let userID = localStorage.getItem('id')
        formData.append('id', userID);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        const r = await fetch(`http://localhost:3000/habits`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        renderHabits([data]);
    } catch (err) {
        console.warn(err);
    }
}



async function getAllHabbits(){
    try {
        let id = localStorage.getItem('id')
        console.log(id);
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch(`http://localhost:3000/habits/${id}`, options);
        const data = await response.json();
        console.log(data);
        if (data.err){ throw Error(data.err) }
        renderHabits(data);
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabbits, postHabit }