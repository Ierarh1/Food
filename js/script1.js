                                        //TABS
const tabs         = document.querySelectorAll('.tabheader__item');
const tabsParent   = document.querySelector('.tabheader__items');
const tabsContent  = document.querySelectorAll('.tabcontent');

function hideContent()
{
    tabsContent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show');
    });

    function removeClassActiveInTabs()
    {
        tabs.forEach(item =>{item.classList.remove('tabheader__item_active');});
    }

    removeClassActiveInTabs();
}

function showTabContent(number = 0)
{
    tabsContent[number].classList.remove('hide');
    tabsContent[number].classList.add('show');


    function addClassActiveInTab()
    {
        tabs[number].classList.add('tabheader__item_active');
    }
    addClassActiveInTab();
}



hideContent();
showTabContent();


tabsParent.addEventListener('click',(event)=>{
    const target =event.target;

    tabs.forEach((item,i)=>{
        if(item == target && item.classList.contains('tabheader__item'))
        {
            hideContent();
            showTabContent(i);
        }
    });
});


                                                    //timer
 const deadLine = '2023-3-16';
 

 function getRemainingTime(endTime)
 {
    const total = Date.parse(endTime) - Date.parse( new Date ());

    const days      = Math.floor(total/(1000*60*60*24));
    const hours     = Math.floor(total/(1000*60*60)%24);
    const minutes   = Math.floor(total/(1000*60)%60);
    const seconds   = Math.floor(total/(1000)%60);

    return {
        'total'   : total,
        'days'    : days,
        'hours'   : hours,
        'minutes' : minutes,
        'seconds' : seconds,
    }
 }

 
 function setTime (endTime,selector)
 {
    const timer   = document.querySelector(selector);
    const days    = timer.querySelector('#days');
    const hours   = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const interval = setInterval(updateTime,1000);

    function updateTime()
    {
        const time = getRemainingTime(endTime);
        
        days.innerHTML    = time.days;
        hours.innerHTML   = time.hours;
        minutes.innerHTML = time.minutes;
        seconds.innerHTML = time.seconds;

        if(time.total<=0)
        {
            clearInterval(interval);
        }
    }

 }

 setTime(deadLine,'.timer');








                                                     //MODALS
const buttonsTriggerModal = document.querySelectorAll('[data-modal]');
const ModalExit           = document.querySelector('[data-close]');
const modal               = document.querySelector('.modal');

function closeModal()
{
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal()
{
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

buttonsTriggerModal.forEach(item=>{
        item.addEventListener('click',()=>{
            openModal();
        });
    });

ModalExit.addEventListener('click',()=>{
    closeModal();
});


                                                    //MenuCart
class MenuCart {
    constructor(src,alt,title,descr,price, parentSelector, ...classes)
    {
        this.src      = src;
        this.alt      = alt;
        this.title    = title;
        this.descr    = descr;
        this.price    = price;
        this.transfer = 75;
        this.price    = this.changeToUAH();
        this.parent   = document.querySelector(parentSelector);
        this.classes  = classes;
    }
    changeToUAH()
    {
        return this.price  * this.transfer;
    }
    render()
    {
        const element = document.createElement('div');

        if(this.classes.length ==0)
        {
            this.classes[0] = "menu__item";
            this.classes.forEach((item)=>{element.classList.add(item)});
        }else{
            this.classes.forEach((item)=>{element.classList.add(item)});
        }
        

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
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    9,
    '.menu .container',
  
).render();

new MenuCart(
    "img/tabs/elite.jpg",
    "elite",
    `Меню “Премиум”<`,
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    19,
    '.menu .container',
    "menu__item"
).render();

new MenuCart(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. `,
    15,
    '.menu .container',
    "menu__item"
).render();




//ЭТО ФУНКЦИОНАЛ ПО ОТПРАВКЕ ПОТОМ ПОТРЕНИРУЕШЬСЯ ТОК НЕУДАЛЯЙ ЕГО
                                               //ЗАДАЧА 
//Отправлять данные из форм на сервер. В нашем случае у нас есть две формы. Одна в виде модалки, 
//вторая просто телефон + имя. В роли сервера будет выступать наш файлик server.php
//кстати пока что будем пользоваться УСТАРЕВШИМ ВАРИАНТОМ а именно XMLHttpRequest

//получим все формы, по тэгу form. Они по функционалу одинаковые поэтому получим тупо по тэгу
const forms = document.querySelectorAll('form');


//организуем сообщения которые будут выдаваться при загрузке страницы
const message = {
    loading: 'загрузка....',
    success: 'спасибо данные отправленны',
    failure: 'что-то пошло не так'
}

//подвяжем нашу функцию постинга под все наши формы
forms.forEach(item =>{postData(item);});



//функция постинга данных
//принимает в себя form(мы на неё будем накидывать обработчик)
function postData(form)
{   //событие 'submit' -срабатывает каждый раз когда мы пытаемся отправить форму
    //либо когда нажмём enter либо мышкой нажмём  на кнопку с типом 'submit'(type = 'submit')
    //если в форме есть хоть одна кнопка она автоматом получит 'submit'
    form.addEventListener('submit',(e)=>{
        //отменяем стандартное поведение браузера
        //именно это команда должна идти в AJAX  в самом начале что бы страница после отправки не обновлялась


        //это блок с сообщения который будет добавляться к форме
        const statusMessage = document.createElement('div');
        //накидываем классы какие нибудь(опционально)
        statusMessage.classList.add('status');
        //и теперь записываем то сообщение которое хотим показать
        statusMessage.textContent = message.loading;
        form.append(statusMessage);


        e.preventDefault();

        //стандартный запрос
        const request = new XMLHttpRequest();

        //1)данные постим. 2)на наш php файлик 
        request.open('POST','server.php');

        //продолжаем донастраивать
        //ставим заголовок для JSON
        request.setRequestHeader('Content-type','application/json');

        //КАК нам теперь получить те данные которые ввёл пользователь в форме. Но получить надо их в JS
        // в форме объекта и его уже отдать серверу?
        //1)конечно мы могли бы взять форму, взять все input  а точнее их value перебрать, сформировать объект
        //но это запарно особенно когда у нас есть альтернативный специально предназначенные для этого варианты
        //2)Воспользуемся одним из таких механизмов а именно FormData. Данные будут перекидываться в формате FormData
        //но нам ничего не стоит перепилить это в JSON. Тут надо ориентироваться на БЭКЭНД, в коком формате принимает
        //данные сервер. 
        //Формирует FormData() даные в форме "ключ-значение"
        //во внуть кидаем то ОТКУДА надо забрать данные
        const formData  = new FormData(form); 

        //Мы можем переделать наш элемент в formData в объект JSON 
        //для этого существует вот такой приём
        const object = {};
        formData.forEach(function(value, key){
            //формируем объект
            object[key] = value;
        });

        //теперь когда у нас есть ОБЫЧНЫЙ ОБЪЕКТ мы можем спарсить его в json
        const json = JSON.stringify(object);

        //отправляем
        //P.s не забудь поправить файл server.php
        //ибо php нативно НЕУМЕЕТ работать с данными JSON
        //поэтому добавь в server.php следующее
        //$_POST = json_decode(file_get_contents("php://input"), true);
        request.send(json);


        //теперь отследим загрузку на сервер. Воспользуемся событием load.(сработает когда получим ответ от сервера)
        request.addEventListener('load',()=>{
            //статус 200 эт всё ок
            if(request.status == 200)
            {
                console.log(request.response);

                //не забываем про статусмесседж. Надо сказать мол спасибо данные отправленны.
                statusMessage.textContent = message.success;


                //очищаем форму. Можем взять форму и перебрать value наших input  и очистить их 
                //либо в наглую воспользоваться спец командой reset
                form.reset();

                //и надо удалить блок 
                setTimeout(() => {
                    //удаляем блок
                    statusMessage.remove();
                }, 3000);
            }
            else
            {
                //а тут скажем что всё плохо
                statusMessage.textContent = message.failure;
            }
        });
    });
}