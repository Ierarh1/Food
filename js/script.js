document.addEventListener('DOMContentLoaded',()=>{

    //TABS
    const tabsParent  = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');



    //скрываем все табы и убираем классы активности
    function hideTabContent(){
        tabsContent.forEach(item=>{
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        //сносим класс активности
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }

    //показываем контент
    //p.s item = 0 -это параметр по умолчанию
    function showTabContent (item = 0)
    {
        //показываем контент. 
        //докидывает ещё класс fade что бы проигралась анимация
        tabsContent[item].classList.add('show','fade');
        tabsContent[item].classList.remove('hide');
        
        //добавляем класс активности
        tabs[item].classList.add('tabheader__item_active');
    }


    //используем делегирование событий
    tabsParent.addEventListener('click',(event)=>{
        //если мы часто пользуемся event.target мы можем его кинуть вотдельную переменную
        //event.target - это то куда тыкнул пользователь
        const target = event.target;

        //далее проверяем на 1) то в какой tabheader__item тыкнули 2)на то что элемент именно наш tabheader__item
        if(target && target.classList.contains('tabheader__item'))
        {
            //теперь надо ещё один цикл перебрать. Логика такая ЕСЛИ tabheader__item который мы перебираем 
            //это тот же элемент на который нажал пользователь то мы вызываем две наши функции
            tabs.forEach((item, i )=>{
                //target это то куда тыкнул пользователь
                //Item - это перебираемы элемен
                //i - это индекс элемента
                if(target == item)
                {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });



    hideTabContent();
    showTabContent();
  





    //TIMER

    const deadLine = '2020-3-10';


    function getTimeRemaining(endTime)
    {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());


        if(t<=0)
        {
            days = hours = minutes = seconds = 0;
        }else{
            days = Math.floor(t / (1000*60*60*24)),
            hours =  Math.floor((t / (1000*60*60*24)) % 24),
            minutes = Math.floor(t / (1000*60) % 60),
            seconds = Math.floor((t/1000)%60);
        }

        
        return{
            'total': t,
            'days':  days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
        

    }

    function getZero(num)
    {
        if(num<10)
        {
            return `0${num}`
        }
        else{
            return num;
        }

    }


    function setClock(selector, endtime)
    {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock,1000);
        updateClock();

        function updateClock()
        {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t['days']);
            hours.innerHTML = getZero(t['hours']);
            minutes.innerHTML = getZero(t['minutes']);
            seconds.innerHTML = getZero(t['seconds']); 
            if(t['total']<=0)
            {
                clearInterval(timeInterval);
            }
        }

        
    }



    setClock('.timer', deadLine);


});

