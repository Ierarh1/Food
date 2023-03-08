const tabsContent = document.querySelectorAll('.tabcontent');
const tabs       = document.querySelectorAll('.tabheader__item');
const tabsParent= document.querySelector('.tabheader__items');





function hideTabsContent()
{
    tabsContent.forEach((item)=>{
        item.classList.add('hide');
        item.classList.remove('show','fade');
    });

    function deleteClassActive()
    {
        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active');
        });
    }

    deleteClassActive();
}


function showTabContent(i=0)
{
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

tabsParent.addEventListener('click',(event)=>{
    const target = event.target;

    tabs.forEach((item,i)=>{
        if(target==item && item.classList.contains('tabheader__item'))
        {
            hideTabsContent();
            showTabContent(i);
        }
    });

});


hideTabsContent();
showTabContent();







//timer
const deadLine = '2023-3-8';

function calculatingTime(endtime)
{
    const remainingTimeMS = Date.parse(endtime) - Date.parse(new Date()); 

    const days    = Math.floor(remainingTimeMS/(1000*60*60*24));
    const hours   = Math.floor(remainingTimeMS/(1000*60*60)%24);
    const minutes = Math.floor(remainingTimeMS/(1000*60)%60);
    const seconds = Math.floor(remainingTimeMS/(1000)%60);

    return {
        'total'   : remainingTimeMS,
        'days'    : days,
        'hours'   : hours,
        'minutes' : minutes,
        'seconds' : seconds,
    }
}

function getZero(num){
    if(num<10)
    {
        return `0${num}`
    }
    else
    {
        return num;
    }
}

function setClock(selector, endtime)
{
    const timer    = document.querySelector(selector);
    const days     = timer.querySelector('#days');
    const hours    = timer.querySelector('#hours');
    const minutes  = timer.querySelector('#minutes');
    const seconds  = timer.querySelector('#seconds');

    const interval = setInterval(updateClock,1000);
    
    updateClock();

    function updateClock()
    {
        const time = calculatingTime(endtime);

        days.innerHTML = getZero(time.days);
        hours.innerHTML= getZero(time.days);
        minutes.innerHTML= getZero(time.minutes);
        seconds.innerHTML= getZero(time.seconds);

        if(time.total<=0)
        {
            clearInterval(interval);
        }
    }
}

setClock('.timer', deadLine);