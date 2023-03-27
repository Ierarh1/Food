

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




                                                //MenuCart
class MenuCart{
    constructor(src,alt,title,descr,price,parentSelector,...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.transfer = 27;
        this.price = price;
        this.price = this.changeToUAH();
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;

    }

    changeToUAH()
    {
        return this.price * this.transfer; 
    }

    render()
    {
        const element = document.createElement('div');

        if(this.classes.length ===0)
        {
            element.classList.add('menu__item');
        }else{
            this.classes.forEach(className => {element.classList.add(className) });
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


const getResource = async (url) =>{
    const result = await fetch(url);

    if(!result.ok)
    {
        throw new Error(`Could not fetch url ${url}, status: ${result.status}`);
    }
    return await result.json();
};



        

/* getResource('http://localhost:3000/menu')
    .then((data)=>{
        data.forEach(({img,altimg,title,descr,price})=>{
            new MenuCart(img,altimg,title,descr,price,'.menu .container').render();
        });
    }); */


axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img,altimg,title,descr,price})=>{
            new MenuCart(img,altimg,title,descr,price,'.menu .container').render();
        });
    });


    

                                            //slider
    
const slides = document.querySelectorAll('.offer__slide');

const current= document.querySelector('#current');

const total  = document.querySelector('#total');

const prev   = document.querySelector('.offer__slider-prev');

const next   = document.querySelector('.offer__slider-next');

let slideIndex = 1;

if(slides.length<10){
    total.innerHTML = `0${slides.length}`
}
else
{
    total.innerHTML = slides.length;
}


showSlide(slideIndex);

function showSlide(n){
    if(n>slides.length)
    {
        slideIndex = 1;
    }


    if(n<1)
    {
        slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');

    slides[slideIndex-1].style.display = 'block';



    if(slideIndex<10){
        current.innerHTML = `0${slideIndex}`
    }
    else{
        current.innerHTML = slideIndex;
    }
}

function plusSlide(n){
    showSlide(slideIndex+=n);
}

prev.addEventListener('click',()=>{
    plusSlide(-1);
});

next.addEventListener('click',()=>{
    plusSlide(+1);
});
