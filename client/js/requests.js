async function postHabit(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/habits`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
    } catch (err) {
        console.warn(err);
    }
}



async function getAllHabbits(){
    try {
        let id = localStorage.getItem('id')
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch(`http://localhost:3000/habits/${id}`, options);
        const data = await response.json();
        if (data.err){ throw Error(data.err) }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabbits, postHabit }