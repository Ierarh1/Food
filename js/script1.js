                                                    //TABS

const  tabsContent = document.querySelectorAll('.tabcontent');
const  tabs        = document.querySelectorAll('.tabheader__item');
const  tabsParent  = document.querySelector('.tabheader__items');

function hideTabsContent()
{
    tabsContent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show','fade');
    });

    function removeClassActiveInTab()
    {
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }
    removeClassActiveInTab();
}

function showTabContent(i = 0)
{
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show','fade');

    tabs[i].classList.add('tabheader__item_active');
}



hideTabsContent();
showTabContent();

tabsParent.addEventListener('click',(event)=>{
    const target = event.target;
    tabs.forEach((item,i)=>{
        if(target == item && item.classList.contains('tabheader__item'))
        {
            hideTabsContent();
            showTabContent(i);
        }
    });
});



                                                    //TIMER
const deadLine = '2023-3-15';

function getRemainingTime(endTime)
{
    const temp = Date.parse(endTime) - Date.parse(new Date());

    const total   = temp;
    const days    = Math.floor(temp/(1000*60*60*24));
	const hours   = Math.floor(((temp/1000*60*60)%24));
	const minutes = Math.floor(((temp/1000*60)%60));
	const seconds = Math.floor(((temp/1000)%60));


    return {
        'total'  : total,
        'days'   : days,
        'hours'  : hours,
        'seconds': seconds,
        'minutes': minutes
    }

}

function setTime(endTime,selector)
{
    const timer     = document.querySelector(selector);
    const days      = timer.querySelector('#days');
    const hours     = timer.querySelector('#hours');
    const minutes   = timer.querySelector('#minutes');
    const seconds   = timer.querySelector('#seconds');


    function updateTime()
    {
        const time = getRemainingTime(endTime);

        days.innerHTML = time.days;
        hours.innerHTML= time.hours;
        minutes.innerHTML= time.minutes;
        seconds.innerHTML= time.seconds;

        if(time.total<=0)
        {
            clearInterval(interval);
        }
    }
  
    const interval = setInterval(updateTime, 1000);
    updateTime();
}

setTime(deadLine,'.timer');


                                                    //MODAL

const triggerModalButtons = document.querySelectorAll('[data-modal]');
const modal               = document.querySelector('.modal');
const closeModalBtn       = document.querySelector('[data-close]');


function showModal()
{
    modal.classList.add('show');
    document.body.style.overflow =  'hidden';
}

function hideModal()
{
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


triggerModalButtons.forEach((item)=>{
    item.addEventListener('click',()=>{
        showModal();
    });
});

closeModalBtn.addEventListener('click',()=>{
    hideModal();
});

document.addEventListener('keydown',(event)=>{
    if(event.code == 'Escape')
    {
        hideModal();
    }
});


                                                    //FoodCarts

 class FoodCart{
    constructor(src,alt,title,descr,price,selectorParent)
    {
        this.src      = src;
        this.alt      = alt;
        this.title    = title;
        this.descr    = descr;
        this.transfer = 27;
        this.price    = price;
        this.price    = this.changeToUAH();
        this.parent   = document.querySelector(selectorParent);;
        
    }

    changeToUAH()
    {
        return this.price * this.transfer;
    }

    render()
    {
        const element = document.createElement('div');

        element.innerHTML = `

        <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div> 

        `;
        this.parent.append(element);
    }


 }

 
new FoodCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    `.menu .container`
).render(); 

new FoodCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    22,
    `.menu .container`
).render(); 

new FoodCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    40,
    `.menu .container`
).render(); 


