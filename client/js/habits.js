const { getAllHabbits } = require("./requests");

async function renderHabits(data) {
  const feed = document.getElementById('habbit-list');
  const habits = document.createElement('div');
  const testData = [{
    id: 1,
    name: "Water Break",
    habit_desc: "Take a water break",
    frequency: "daily",
    streak_track: 4,
    streak_start: "test",
    streak_end: "test",
    user_id: 1
  }]

  const allHabits = (habitData) => {
    let format_c_date;
    if (habitData.streak_complete) {
      const complete_date = new Date(habitData.streak_complete)
      format_c_date = formatDate(complete_date)
    } else {
      format_c_date = 'Not completed yet.'
    }
    const end_date = new Date(habitData.streak_end)
    let format_e_date = formatDate(end_date)

    const habit = document.createElement('div');
    habit.id = habitData.id;
    habit.className = "single-habit";
    const name = document.createElement('h3');
    name.textContent = habitData.name;
    name.className = "habbit-name";
    const desc = document.createElement('p');
    desc.textContent = habitData.desc;
    desc.className = "habbit-desc";
    const freq = document.createElement('p');
    freq.textContent = `Frequency: ${habitData.frequency}`;
    freq.className = "habbit-freq";
    const track = document.createElement('p');
    track.id = `count-${habitData.id}`
    track.textContent = `Streak: ${habitData.streak_track}`;
    track.className = "habbit-track";
    const startDate = document.createElement('p');
    startDate.textContent = `When you can next complete this habbit: ${format_c_date}`;
    startDate.className = "habbit-complete-date";
    const endDate = document.createElement('p');
    endDate.textContent = `Streak end date: ${format_e_date}`;
    endDate.className = "habbit-streak-end";
    endDate.style = 'margin-bottom: 10px;'
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.for=`complete-${habitData.id}`;
    checkBoxLabel.textContent = 'Mark as complete: '
    checkBoxLabel.className = "habbit-check-label";
    const checkBox = document.createElement('input');
    checkBox.className = "habbit-checkbox";

    const current_date = new Date();
    const old_date = new Date(habitData.streak_complete)
    checkBox.type = "checkbox";
    checkBox.id = `complete-${habitData.id}`;
    checkBox.name = `complete-${habitData.id}`;
    if(old_date && old_date > current_date) {
      checkBox.checked = true;
      checkBox.disabled = true;
    } else {
      checkBox.disabled = false;
    }

    checkBox.addEventListener('change', updateHabitClient)

    habit.appendChild(name);
    habit.appendChild(desc);
    habit.appendChild(freq);
    habit.appendChild(track);
    habit.appendChild(startDate);
    habit.appendChild(endDate);
    habit.appendChild(checkBoxLabel);
    habit.appendChild(checkBox);

    habits.appendChild(habit);
  }

  data.forEach(allHabits);
  feed.appendChild(habits);
}

async function updateHabitClient(e) {
  e.target.disable = true;
  const habit_id = e.target.parentElement.id;
  console.log(e);
  try {
      console.log(habit_id);
      const options = {
          method: 'PATCH',
          headers: new Headers({'Authorization': localStorage.getItem('token')}),
      }
      const response = await fetch(`${API_URL}/habits/${habit_id}`, options);
      const data = await response.json();
      console.log(data);
      if (data.err){ throw Error(data.err) }
      updateStreak(data);
  } catch (err) {
      console.warn(err);
  }
}

async function updateStreak(data) {
  console.log(data);
  let id = localStorage.getItem('id')
  let count = data.streak_track;
  console.log('Test')
  console.log(data.streak_track);
  console.log(data.id);
  let checkedBox = document.getElementById(`complete-${data.id}`);
  checkedBox.disabled = true;
  let theCounter = document.getElementById(`count-${data.id}`)
  theCounter.textContent = count;
}

function formatDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const format_date = month  + '\n'+ day  + ',' + year;
  return format_date;
}

module.exports = {renderHabits};