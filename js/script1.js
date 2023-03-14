                                            //TABS
const tabs        = document.querySelectorAll('.tabheader__item');
const tabsParent  = document.querySelector('.tabheader__items');
const tabsContent = document.querySelectorAll('.tabcontent');


function hideTabsContent()
{
    tabsContent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show');
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
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide');

    tabs[i].classList.add('tabheader__item_active');
}



hideTabsContent();
showTabContent();


tabsParent.addEventListener('click',(event)=>{
    const target = event.target;

    tabs.forEach((item, index)=>{
        
        if(target === item && item.classList.contains('tabheader__item'))
        {
            hideTabsContent();
            showTabContent(index);
        }

    });


});

                                                    //TIMER
 
const deadLine = '2023-3-14';                                                   

function getTimeRemaining(endTime)
{
    const temp = Date.parse(endTime) - Date.parse(new Date());

    const total   = temp;
    const days    = Math.floor(temp/(1000*60*60*24));
    const hours   = Math.floor((temp/(1000*60*60))%24);
    const minutes = Math.floor((temp/(1000*60))%60);
    const seconds = Math.floor(temp/(1000)%60);

    return {
        'total'   : total,
        'days'    : days,
        'hours'   : hours,
        'minutes' : minutes,
        'seconds' : seconds
    }
}

function setTime(endTime,selector)
{
    const timer   = document.querySelector(selector);
    const days    = timer.querySelector('#days');
    const hours   = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    
    function updateTime()
    {
        const time = getTimeRemaining(endTime);

        days.innerHTML    = time.days;
        hours.innerHTML   = time.hours;
        minutes.innerHTML = time.hours;
        seconds.innerHTML = time.seconds;

        if(time.total<=0)
        {
            clearInterval(interval);
        }
    }
    updateTime();

    const interval = setInterval(updateTime,1000);
}

setTime(deadLine,'.timer');





                                                 //MODAL
const btnsTriggerModal = document.querySelectorAll('[data-modal]');
const closeModalBtn    = document.querySelector('[data-close]');
const modal            = document.querySelector('.modal');



function showModal()
{
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal()
{
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

btnsTriggerModal.forEach(item=>{
    item.addEventListener('click',()=>{
        showModal();
    });
});

closeModalBtn.addEventListener('click',()=>{
    hideModal();
});


document.addEventListener('keydown', (event)=>{
    if (event.code == 'Escape')
    {
        hideModal();
    }
});


                                                    //FoodCart

class MenuCart{
    constructor(src,alt,title,descr,price,parentSelector, ...classes)
    {
        this.src      = src;
        this.alt      = alt;
        this.title    = title;
        this.descr    = descr;
        this.transfer = 27;
        this.price    = price;
        this.price    = this.changeToUAH();
        this.parent   = document.querySelector(parentSelector);
        this.classes  = classes;
    }
    changeToUAH()
    {
        return this.price * this.transfer;
    }

    render()
    {
        const element = document.createElement('div');

        if(this.classes.length == 0)
        {
            element.classList.add('menu__item');
        }
        this.classes.forEach(item =>{ 
            element.classList.add(item);
        });

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

        this.parent.append(element);
        
    }
}

new MenuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    `menu__item`,
    `big`
).render();

new MenuCart(
    "img/tabs/elite.jpg",
    "elite",
    `Меню “Премиум”`,
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    46,
    '.menu .container',
    `menu__item`,
).render();

new MenuCart(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    99,
    '.menu .container',
    `menu__item`,
    `nipples`
).render();