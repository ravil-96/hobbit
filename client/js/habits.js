async function renderHabits() {
  const feed = document.getElementById('habbit-list');
  const habits = document.createElement('div');
  const userHabits = await getAllHabbits();

  const allHabits = (habitData) => {
    const habit = document.createElement('div');
    habit.id = habitData.id;
    const name = document.createElement('h5');
    name.textContent = habitData.name;
    const desc = document.createElement('p');
    desc.textContent = habitData.habit_desc;
    const freq = document.createElement('p');
    freq.textContent = `Frequency: ${freq}`;
    const track = document.createElement('p');
    track.textContent = habitData.streak_track;
    const startDate = document.createElement('p');
    startDate.textContent = habitData.streak_start;
    const endDate = document.createElement('p');
    endDate.textContent = habitData.streak_end;

    habit.appendChild(name);
    habit.appendChild(desc);
    habit.appendChild(freq);
    habit.appendChild(track);
    habit.appendChild(startDate);
    habit.appendChild(endDate);

    habits.appendChild(habit);
  }

  userHabits.forEach(allHabits);
  feed.appendChild(habits);
}