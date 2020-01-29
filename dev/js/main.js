let months = {
    'ru' : [
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
        _.date = new Date();
        _.year = _.date.getFullYear();
        _.month = _.date.getMonth();
        _.dayInMonth = _.date.getDate();
        _.dayInWeek = _.date.getDay();
        _.language = 'ru';
        _.cal = {
            body : document.querySelector('#calendar'),
            monthSelect : document.querySelector('#monthSelect'),
            yearSelect : document.querySelector('#yearSelect'),
            month : document.querySelector('.calendar-month')
        };
    }

    //Метод выбора первого дня
    firstDayInWeek(){
        const _ = this;
        let unit = new Date(_.year + '-' + (_.month + 1)),
            firstDayStyle = unit.getDay(),
            firstDay = document.querySelector('.calendar-month-first');
        firstDay.style.gridColumnStart = firstDayStyle;
    }

    //Метод отприсовки дней в месяце
    drawDays(month,year){
        const _ = this;
        let days = 31;
        if((month == 3) || (month == 5) || (month == 8) || (month == 10)){days = 30;}
        else if((month == 1)){
            if((year % 4) == 0){days = 29}
            else {days = 28}
        }
        _.cal.month.innerHTML = '';
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
                _.cal.month.append(btn);
            if(i == 0){btn.classList.add('calendar-month-first')}
        }
        _.firstDayInWeek();
    }

    //Метод выбора активного дня
    pickActive(el){
        const _ = this;
        let arr = document.querySelectorAll('.calendar-month-day');
        for(let i = 0; i < arr.length; i++){
            if(i == el - 1){arr[i].classList.add('calendar-active')}
            else {arr[i].classList.remove('calendar-active')}
        }
    }
    init(){
        const _ = this;
        _.drawDays(_.month,_.year);
        _.pickActive(_.dayInMonth);
    }
}





let list = new List();
list.init();



document.addEventListener('click',function (el) {
    let clickTarget = el.target,
        elem = document.querySelectorAll('.calendar-select-ul');
    if(clickTarget == list.cal.monthSelect){
        if(elem[1].classList.contains('calendar-select-ul-active')){
            elem[1].classList.remove('calendar-select-ul-active')
        }
        elem[0].classList.toggle('calendar-select-ul-active');
    }
    else if(clickTarget == list.cal.yearSelect) {
        if(elem[0].classList.contains('calendar-select-ul-active')) {
            elem[0].classList.remove('calendar-select-ul-active')
        }
        elem[1].classList.toggle('calendar-select-ul-active')
    } else {
        elem[0].classList.remove('calendar-select-ul-active');
        elem[1].classList.remove('calendar-select-ul-active')
    }
});
list.cal.month.addEventListener('click',function (el) {
    let clickTarget = el.target;
    if(clickTarget == list.cal.month) return;
    else if(!clickTarget.classList.contains('calendar-month-day')){
        clickTarget = clickTarget.parentElement;
    }
    let day = clickTarget.querySelector('.calendar-month-day-number');
    list.pickActive(day.textContent)
});