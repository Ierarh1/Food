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

//почему время в формате такой строки??
//всё просто в будущем скорее всего прийдётся подвязывать наш сайт под какую нибудь административную панель
//а такая панель чаще всего возвращает время в формате string
const deadLine  = '2025-02-23';                            



//функция которая определяет разницу между deadLine  и нашим текущим временем
function getTimeRemaining(endtime){
	//превращаем нашу строку в число
	//Date.parse(endtime) - это конечное время в миллисекундах
	//Date.parse(new Date()) - это наше нынешнее время да ещё и в миллисекундах
	const t = Date.parse(endtime) - Date.parse(new Date());


	//теперь надо полученную разницу t -превратить в количество ДНЕЙ ЧАСОВ МИНУТ СЕКУНД(это я из макета взял там такое требование)
	//получим количество дней 
	//Math.floor - округляет до ближайшего целого
	const days = Math.floor(t/(1000*60*60*24));

	//дальше часы минуты.... там чуть сложнее но разберёшься
	const hours = Math.floor(((t/1000*60*60)%24));
	const minutes=Math.floor(((t/1000*60)%60));
	const seconds=Math.floor(((t/1000)%60));

	//теперь нам надо вернуть эти данные наружу. Вёрнём их ОБЪЕКТОМ
	return{
		'total':t,
		'days': days,
		'hours':hours,
		'minutes':minutes,
		'seconds':seconds,
	};
}

///эх, короче. мы хотим что время в наш таймер подставлялось в формате 00. Т. е. если у нас 
//в таймер попало 9 часов, мы хотим что бы оно автоматом превращалось в формат 09
function getZero(num){
	//проверяем на барахло num>=0
	//прибавлять ноль нужно только числам от 0 до 9, поэтому условие num<10
	if(num>=0 && num<10)
	{
		return `0${num}`;
	}
	else{
		return num;
	}
}


//теперь непосредственно та функция которая будет устанавливать время на нашу страничку
//1)аргумент это селектор где находятся все наши блоки со временем
//2)аргумент, нам понадобится что бы тормознуть таймер,  иначе хрен пойми,время уже вышло, а тамер будет хреначить
function setClock(selector, endtime){
	const timer = document.querySelector(selector),
		  days = document.querySelector('#days'),
		  hours = document.querySelector('#hours'),
		  minutes = document.querySelector('#minutes'),
		  seconds = document.querySelector('#seconds');

	//так же нам нужно что-то будет запускать нашу нижнюю функцию дабы КАЖДУЮ секунду обновлять таймер
	const timeInterval = setInterval(updateClock,1000);

	//когда запускается setInterval(updateClock,1000), то он вначале подождёт 1 секунду а потом стартанёт
	//на вёрстке это будет выглядеть как баг МЕРЦАНИЯ времени(т.к по умолчанию в вёрстке стоят свои значения)
	//и фиксится этот баг тем что мы один раз мы вызовём функцию сами БЕЗ ТАЙМЕРА
	updateClock();

	//теперь нам нужна функция которая будет обновлять таймер каждую секунду
	function updateClock(){
		//расчёт времени которое нам осталось ПРЯМ НА ЭТУ СЕКУНДУ
		const t = getTimeRemaining(endtime);//вёрнёт своим результатом объект набитый данными days/hours......

		//теперь непосредственно вносим на нашу страницу
		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		//мы выше сделали автообновление функци каждую секунду. и поэтому нам необходимо будет
		//СТОПАРНУТЬ нашу функцию updateClock() как только таймер истечёт для этого мы и брали переменную total
		if(t.total<=0){
			clearInterval(timeInterval);
		}
	 }
}

//заводим нашу функцию
setClock('.timer',deadLine);




                                                    //MODAL
//кнопки вызоват модальных окон с дата атрибутами data-modal
const modalTrigger = document.querySelectorAll('[data-modal]');
//само модальное окно
const modal        = document.querySelector('.modal');



//логика такая. Нам надо всего лишь две функции 1)открывает модалку. 2)закрывает модалку

//открываем модальное окно
modalTrigger.forEach(item=>{
    item.addEventListener('click',openModal);
});


function openModal()
{
    modal.classList.add('show');
    modal.classList.remove('hide');

    //замораживаем прокрутку
    document.body.style.overflow = 'hidden';

    //очищаем интервал открытия окна. Если пользователь сам открыл окно то мы больше ему его показывать не будем
    clearInterval(modalTimer);
}


//функция по закрытию окна
function closeModal()
{
    modal.classList.add('hide');
    modal.classList.remove('show');

    //восстанавливаем работу прокрутки
    document.body.style.overflow = '';
}





//как сделать так что бы пользователь кликал на подложку модального окна и оно закрывалось
//важно что бы html была нормальная структура что бы modal__dialog была рабочей областью
//а уже Modal была полдожкой.
//расширим функционал подложки, теперь если мы щёлкнём на подложку или на какой нибудь 
//элемент с атрибутом [data-close] это наш крестик на модальном окне то окно закроется
//кстати сравнивать будем с пустой строкой тк нам нужно именно булевый ответ, а пустая строка
//потому как мы event.target.getAttribute('data-close') ничего не присваивали
modal.addEventListener('click',(event)=>{
    if(modal === event.target ||  event.target.getAttribute('data-close') == '')
    {
        closeModal();
    }
});



//закрываем модальное окно с помощью кнопки ESC
document.addEventListener('keydown',(e)=>{

    //если нажатая кнопка это 'Escape'.
    //а второе условие contains('show') - это проверяем что модальное окно ОТКРЫТО
    if(e.code ==='Escape' && modal.classList.contains('show'))
    {
        closeModal();
    }


});


//Через какое -то время будет появляться модальное окно.

const modalTimer = setTimeout(openModal, 3000);




//реализуем фичу, когда модальное окно открывается когда пользователь доскроллил доконца страницу
function showModalByScroll(){
    // window.pageXOffset -ПРОКРУЧЕННАЯ ЧАСТЬ
    //document.documentElement.clientHeight -видимая часть  которую мы видим без прокрутки
    if(window.pageXOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight-1)
    {
        openModal();
        window.removeEventListener('scroll',showModalByScroll);
    }
}





window.addEventListener('scroll',showModalByScroll);








                                                    //Carts(with class)
//...clases - это аргумент в который будем закидывать классы, которые будут применяться
//ну типо для кастомизации. Мы знать незнаем сколько их там будет поэтому делаем через rest оператор
class MenuCart{
    constructor(src,alt,title,desr,price,parentSelector,...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desr = desr;
        this.price= price;
        //не забываем что rest оператор вернёт МАССИВ поэтому и работать надо будет как с массивом
        this.classes = classes;
        //родительский элемент КУДА будем вставлять наш класс
        this.parent = document.querySelector(parentSelector);
        //курс валюты
        this.transfer = 27;
        //кстати в конструкторе позволительно вызывать методы класса
        this.price = this.changeToUAH();
    }
    changeToUAH(){
       return (this.price = this.price * this.transfer);
    }


    render()
    {
        const element = document.createElement('div');

        //т.к у на есть классы которые кидали через rest надо перебрать их(ибо они в массиве)
        //и подкинуть их нашему element
        //реализуем кстати через If будем проверять, а то вдург пользователь забыл классы подкинуть
        //в таком случае сделаем что бы было хотя бы дефолтный

        if(this.classes.length ===0)
        {
            //создастася новое своейство в нашем классе this.element
            this.element = 'menu__item';

            //а теперь добавляем СВОЙСТВО this.element, к нашему элементу element
            element.classList.add(this.element);
        }
        else
        {
            this.classes.forEach(className =>{element.classList.add(className)});
        }

        element.innerHTML = `
            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
        `;

        //помещаем наш элемент на страницу
        this.parent.append(element);
    }
}


// создаём функцию для получения нашего товара с карточками из db.json
const getResource = async (url) =>{
    const res = await fetch(url);

    //теперь собственно проблема, если fetch столкнётся с проблемой.
    //типо 404 либо 500 наш reject несработает. И нам нужно отработать эти ошибки
    //у fetch есть два свойствао у промиса который возвращается из fetch
    //1) ОК - говорит о том что мы что-то получили
    //2) Status - тут мы получаем статус сервера 200.400, 4040.....
    if(!res.ok){
        //выкидываем ошибку. Если выкидываем ошибку в ручном режиме. То сработает catch

        //теперь поработаем с ОБЪЕКТОМ ОШИБКИ
        //throw - выкидываем ошибку
        //а внутри  Error() - это тело ошибки
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}





//mym будем запрашивать наши данные
getResource('http://localhost:3000/menu')
    .then(data => {
        //кстати если посмотришь на db.json то внутри у нас МАССИВ
        //а у массивов есть свойства и переберём foReach
        //кстати в качестве item используем деструктуризацию это будет удобнее
        data.forEach(({img, altimg, title, descr, price})=>{
            new MenuCart(img, altimg, title, descr, price, '.menu .container').render();
        })
    })

//вариант запроса данных но черех библиотеку axios
/* axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img,altimg,title,descr,price})=>{
            new MenuCart(img,altimg,title,descr,price,'.menu .container').render();
        });
    });

 */
//как видно у нас всего лишь одна функция

                            //то как мы раньше создавали элементы на странице
/* new MenuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
    'big'                 //тестовый класс, ну просто убедиться что всё работает

).render();
 */


                                                //ЗАДАЧА 
//Отправлять данные из форм на сервер. В нашем случае у нас есть две формы. Одна в виде модалки, 
//вторая просто телефон + имя. В роли сервера будет выступать наш файлик server.php
//кстати пока что будем пользоваться УСТАРЕВШИМ ВАРИАНТОМ а именно XMLHttpRequest

//получим все формы, по тэгу form. Они по функционалу одинаковые поэтому получим тупо по тэгу
const forms = document.querySelectorAll('form');


//организуем сообщения которые будут выдаваться при загрузке страницы
const message = {
    loading: 'img/form/spinner.svg',
    success: 'спасибо данные отправленны',
    failure: 'что-то пошло не так'
}

//подвяжем нашу функцию постинга под все наши формы
forms.forEach(item =>{bindPostData(item);});


//функция для постинга данных
const postData = async (url, data)=>{
    //fetch - возвращает промис если что.
    //Важный момент. fetch асинхронен, и мы понятия не имеем сколько он будет выполняться,
    //но код пойдёт дальше. Т.е первое время в res будет храниться НИЧЕГО, но код пойдёт дальше.
    //и может случиться такая проблема, что дойдя до return res.json();  наш fetch НЕ УСПЕЕТ.
    //и когда мы вызовём метод .json(); У нашего res его тупо НЕ БУДЕТ. Для решения этой проблемы,
    //дабы мы могли проконтролировать исполнение кода и были придуманны async/await
    //в названии начала пишем async как бы говорим что дальше у нас будет асинхронный код.
    //ВТорой же оператор ставим перед теми функциями которые нам НАДО ДОЖДАТЬСЯ.
    //Код будет дожидаться нашего fetch ( лимит  где-то 30секун). Но код не станет полностью синхронным,
    //ничего блокироваться во вне функции небудет. Но JS дождётся результат от fetch и уже в res 
    //будет результат  а не просто undefined 
    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });

    //тк res Это промис, то мы его может так же обработать(превратив  json-файл) и венрём
    //p.s .json() - так же возвращает промис
    return await res.json();
    //тут тоже делаем await ибо .json() так же даёт промис, и мы знать не знаем какого размера там данные
    //нам надо выполнеия этих данных дождаться
};



//функция постинга данных
//принимает в себя form(мы на неё будем накидывать обработчик)
function bindPostData(form)
{   //событие 'submit' -срабатывает каждый раз когда мы пытаемся отправить форму
    //либо когда нажмём enter либо мышкой нажмём  на кнопку с типом 'submit'(type = 'submit')
    //если в форме есть хоть одна кнопка она автоматом получит 'submit'
    form.addEventListener('submit',(e)=>{
        //отменяем стандартное поведение браузера
        //именно это команда должна идти в AJAX  в самом начале что бы страница после отправки не обновлялась


        //это блок с сообщения который будет добавляться к форме
        //у нас там будет спиннер поэтому создаём img
        const statusMessage = document.createElement('img');
        //теперь нашему тэгу надо кинуть путь к нашему спинеру, делается так
        statusMessage.src = message.loadingl; 
        //тк у на появляется изображение то всё таки ему нужны кое какие дополнительные стили
        //накинем их как инлайн стили
        statusMessage.style.cssText = `
                dispay: block;
                margin: 0 auto;
        `;

        form.insertAdjacentElement('afterend',statusMessage);


        e.preventDefault();

 
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


        //новый способ как превратить formData  в json
        //небольшой ликбез. Object.entries превращает объект в массив с массивами 
        //если было {a: 24 , b: 50} то станет [[a , 24],[b , 50]]
        //само собой что есть и обратный метод Object.fromEntries
        //.entries мы так же можем вызвать на formData и это даст именно тот объект который описали выше
        //ну и про .fromEntries не забываем

        //Теперь логика. Берём нашу  formData превращаем её в массив массивов .entries. Дальше мы превращаем
        //её в классический объект .fromEntries. А затем JSON.stringify() превращаем в файлик json
        
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

  
                         //Fetch() - будем отправлять данные с помощью ФЕТЧА
        //воспользуемся нашей функцией postData
        //1)куда
        //2)что отправляем
        postData('http://localhost:3000/requests', json
        ).then((data)=>{
            console.log(data);
            showThanksModal(message.success);

            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        });
       //как только код выполнился, если всё ок ты можешь зайти в db.json и там будет новый пользователь
    });
}




//логика такая Мы скрываем старый '.modal__dialog'. А затем создаём новый '.modal__dialog' и наполняем его
//контентом.
function showThanksModal(message)
{
    //будем заменять наш modal__dialog у него есть какие никакие стили, и позиционирование
    const prevModalDialog = document.querySelector('.modal__dialog');

    //скроем наш modal__dialog. ВАЖНО мы именно скрываем. Удалять НЕЛЬЗЯ, иначе если пользовать переоткроет окно
    //то оно тупо неоткроется больше, ибо мы его удалили. Поэтому СКРЫВАЕМ
    prevModalDialog.classList.add('hide');

    //и откроем модальное окно
    openModal();

    //теперь можно создавать наш контент
    //вначале сделаем блок обёртку
    const thanksModal = document.createElement('div');
    
    //назначим ему классы что бы он нормально выглядел.
    //закинем ему классов от .modal__dialog. По сути мы заменили старый .modal__dialog на новый .modal__dialog
    thanksModal.classList.add('modal__dialog');

    //а теперь формируем ту вёрстку что будет у нас в окне
    //сделаем такую же как у нас была в стандартном окне
    thanksModal.innerHTML = `
        <div class ="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);

    //теперь нам необходимо что бы после того как поблагодарили пользователя
    //наше окно с благодарностями исчезло а старый функционал восстановился
    setTimeout(()=>{
        //мы можем наше окошко с благодарностями удалить
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');

        //и теперь надо закрыть модалку дабы не мешать пользователю
        closeModal();
    },4000);
}


/* 
                                                    //SLIDER Version 1
//сами слайдеры, картиночки
const slides = document.querySelectorAll('.offer__slide');
//стрелочка предыдущий слайд
const prev   = document.querySelector('.offer__slider-prev');
//стрелочка следующий слайд
const next   = document.querySelector('.offer__slider-next');
//Это ОБЩЕЕ количество слайдов
const total  = document.querySelector('#total');
//эт текущий слайд
const current= document.querySelector('#current');

//данный индекс будет определять текущее положение в слайдере
let slideIndex = 1;

//надо проинициализировать наш слайдер иначе будут косяки
showSlides(slideIndex);

//определим общее количество слайдеров и поместим на страничку
//если их меньше 10 то добавим нолик (03 05 07...)
if(slides.length <10)
{
    total.textContent = `0${slides.length}`
}
else
{
    total.textContent = slides.length;
}


function showSlides(n){
    //предусмотрим граничные значения, когда мы из последнего слайда перемещаемся в первый и наоборот
    if(n>slides.length)
    {
        //перемещаемся в начало
        slideIndex = 1;
    }

    if(n < 1)
    {
        //перемещаемся в конец
        slideIndex = slides.length;
    }

    //надо скрыть все слайды и показать только тот  что нам нужен
    slides.forEach(item => item.style.display = 'none');

    //берём нужный слайд и показываем нужный
    slides[slideIndex - 1].style.display = 'block';


    //реализум переключение циферок для текущего слайда
    if(slideIndex<10)
    {
        current.textContent = `0${slideIndex}`
    }
    else{
        current.textContent = slideIndex;
    }
}

//функция которая будет отнимать/прибавлять значения
function plusSlides(n)
{
    showSlides(slideIndex +=n);
}



//вешаем обработчики
prev.addEventListener('click',()=>{
    plusSlides(-1);
});

next.addEventListener('click',()=>{
    plusSlides(+1);
});

 */



                                                    //SLIDER Version 2

//сами слайдеры, картиночки
const slides        = document.querySelectorAll('.offer__slide');
//стрелочка предыдущий слайд
const prev          = document.querySelector('.offer__slider-prev');
//стрелочка следующий слайд
const next          = document.querySelector('.offer__slider-next');
//Это ОБЩЕЕ количество слайдов
const total         = document.querySelector('#total');
//эт текущий слайд
const current       = document.querySelector('#current');
//наша обёртка-окошко через которое будем наблюдать за слайдами
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
//наша каруселька со сладами
const slidesField   = document.querySelector('.offer__slider-inner');

//при итнициализации слайдера нам понадибтся знать КАКАЯ ШИРИНА у на шего главного блока 
//в котором будут показываться слайды '.offer__slider-wrapper' Эти данные вытащим через 
//compudet стили - это уже примененные стили
const width = window.getComputedStyle(slidesWrapper).width;

//данный индекс будет определять текущее положение в слайдере
let slideIndex = 1;

//нам понадобится знать ОТСТУП на сколько мы отсупили ВПРАВО/ВЛЕВО
let offset = 0;

//инициализируем общее количество слайдов и текущий слайд
if(slides.length <10)
{
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
}
else
{
    total.textContent = slides.length;
    current.textContent = slideIndex;
}


//slidesWrapper -будет занимать довольно большое пространство в ОДНУ СТРОЧКУ
//и внутри себя оно будет как раз выстраивать слайды.
//Поэтому надо установить этому блоку ШИРИНУ. т.е умножить количество слайдов на 100%
slidesField.style.width = (100 * slides.length) + '%';
//делаем это для того что бы МОЖНО БЫЛО взять все слайды и затолкать во внутрь slidesField
//ну  и они вроде как полностью помещались

//так же нам надо что бы слайды выстроились в один ряд по горизонтали для этого поставим flex
slidesField.style.display = 'flex';

//плавную анимацию прикрутим
slidesField.style.transition = '0.5s all';


//теперь самое главное, ограничим обзор наших слайдов что бы показывалось только то что не выходит
//за границу slidesWrapper
slidesWrapper.style.overflow = 'hidden';



//т.к помещаемые слайды могут быть РАЗНОЙ ширины, т.е не фексированныей
//поэтому давайте установим им ширину нашего родительского окошка 
slides.forEach(slide => slide.style.width = width);



//двигаем в право
next.addEventListener('click',()=>{

    //сдлеаем небольшое условие, когда щёлкаем вправо и доходим до конца, мы возвращаемся на 1 слайд
    //p.s в width хранится примерно такое число "500px" и нам надо избавиться от "px" и превратить в число
    //поэтому будет +width.slice(0,width.length-2)  так мы отрежим "px" и превратим в число
    if(offset == +width.slice(0,width.length-2) * (slides.length-1))
    {   //мы долистали доконца и нам надо вернуться в начало
        offset = 0;
    }
    else
    {
        //если же слайд НЕ ПОСЛЕДНИЙ то добавляем смещение
        offset += +width.slice(0,width.length-2);
    }

    //когда мы нажимаем кнопку нам необходимо сдвинуть слайд
    slidesField.style.transform = `translateX(-${offset}px)`;

    //тут работаем с нашим текущим слайдом, увеличиваем значение
    if(slideIndex == slides.length)
    {
        slideIndex = 1;
    }
    else
    {
        slideIndex++;
    }

    if(slideIndex <10)
    {
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }

});

//двигаем в лево
prev.addEventListener('click',()=>{

    //есле мы на 1 слайде, и шёлкаем влево, то нам надо сместиться на последний слайд
    if(offset == 0)
    {   
        offset = +width.slice(0,width.length-2) * (slides.length-1);
    }
    else
    {
        //если же слайд НЕ ПОСЛЕДНИЙ то добавляем смещение
        offset -= +width.slice(0,width.length-2);
    }

    //когда мы нажимаем кнопку нам необходимо сдвинуть слайд
    slidesField.style.transform = `translateX(-${offset}px)`;


    //тут работаем с нашим текущим слайдом, увеличиваем значение
    if(slideIndex == 1)
    {
        slideIndex = slides.length;
    }
    else
    {
        slideIndex--;
    }

    
    //тут добавляем помещаем на страницу текущий слайд
    if(slideIndex <10)
    {
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }
});



















});