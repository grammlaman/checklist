let months = {
    ru : [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
};
class List {
    constructor() {
        const _ = this;
        _.date = new Date('2020-02');
        _.year = _.date.getFullYear();
        _.month = _.date.getMonth();
        _.dayInMonth = _.date.getDate();
        _.dayInWeek = _.date.getDay();
        _.calendar = {
            body : document.querySelector('#calendar'),
            monthSelect : document.querySelector('#monthSelect'),
            yearSelect : document.querySelector('#yearSelect'),
            daysInMonth : document.querySelector('.calendar-month')
        };
    }
    //Метод выбора первого дня
    firstDayInWeek(month,year){
        let unit = new Date(year + ' - ' + month),
            firstDay = unit.getDay();
        document.querySelector('.calendar-month-day').style.marginLeft = 'calc(100% / 7)' * firstDay + 'px' ;
    }
    //Метод выбора активного дня
    pickActive(el = (this.dayInMonth - 1)){
        const _ = this;
        let arr = document.querySelectorAll('.calendar-month-day');
        for(let i = 0; i < arr.length; i++){
            if(i == el){
                arr[i].classList.add('calendar-active')
            }
        }
    }
    //Метод отприсовки дней в месяце
    drawDays(month,year){
        const _ = this;
        let days = 31;
        if((month == 3) || (month == 5) || (month == 8) || (month == 10)){
            days = 30;
        } else if((month == 1)){
            if((year % 4) == 0){
                days = 29
            } else {days = 28}
        }
        _.calendar.daysInMonth.innerHTML = '';
        for(let i = 0; i < days; i++){
            let btn = document.createElement('BUTTON'),
                day = document.createElement('SPAN'),
                tasks = document.createElement('SPAN'),
                cnt = i + 1;
                if(cnt < 10) cnt = '0' + cnt;
                btn.className = 'calendar-month-day';
                day.className = 'calendar-month-day-number';
                day.textContent = cnt;
                tasks.className = 'calendar-month-day-do';
                tasks.textContent = 'Дел: 0';
                btn.append(day,tasks);
                _.calendar.daysInMonth.append(btn)
        }
        _.firstDayInWeek();
        _.pickActive();
    }
    init(){
        const _ = this;
        _.drawDays(_.month,_.year)
    }
}
let list = new List();
list.init();

document.querySelector('.calendar-month').addEventListener('click',function (el) {
    let clickTarget = el.target;
    if(clickTarget == document.querySelector('.calendar-month')) return;
    else if(clickTarget == document.querySelector('.calendar-month-day')) return;
    else {clickTarget = clickTarget.parentElement;}
    list.pickActive(clickTarget)
});