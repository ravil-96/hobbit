const {renderHabits, updateStreak} = require('../habits')


describe('habit rendering', () =>{
    
    const data = [{
        id: 1,
        name: "Water Break",
        habit_desc: "Take a water break",
        frequency: "daily",
        streak_track: 4,
        streak_start: "test",
        streak_end: "test",
        user_id: 1
      },
      {
        id: 2,
        name: "Long Sleep",
        habit_desc: "Get to bed Early!",
        frequency: "daily",
        streak_track: 5,
        streak_start: "test",
        streak_end: "test",
        user_id: 2
      }]
    let habitsDiv;

    let dataName1= data[0].name
    let dataName2= data[1].name
    

    beforeAll(() => {
        document.documentElement.innerHTML = '<body><div id="habbit-list"><h1>Your habits:</h1></div></body>';
        renderHabits(data);
        habitsDiv = document.querySelectorAll('.single-habit')
    });


    describe('renderHabit', () =>{
        
        it('list should have two elemends with id single-habit ', () => {
            let len = habitsDiv.length
            expect(len).toBe(2);
        })

        it('list names should match habit header name ', () => {
            let firstHabbit = habitsDiv[0].querySelector('.habbit-name')
            let secondHabbit = habitsDiv[1].querySelector('.habbit-name')
            
            console.log(firstHabbit.textContent)
            
            
            expect(firstHabbit.textContent).toEqual(dataName1);
            expect(secondHabbit.textContent).toEqual(dataName2);
            expect(firstHabbit.parentElement.id).toEqual('1')
            expect(secondHabbit.parentElement.id).toEqual('2')
        })
    })

    // describe('updateStreak', () =>{
        
        
    // })


})