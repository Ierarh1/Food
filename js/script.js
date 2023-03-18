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









                                            //расскоментируй
const modalTimer = setTimeout(openModal, 3000);




//реализуем фичу, когда модальное окно открывается когда пользователь доскроллил доконца
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


//сокращённый синтаксис вызова нашего класса, без создания переменной
//и на этом же классе мы вызываем метод 
// new MenuCart().render();
//
//однако нам надо передать много аргументов поэтому мы его разорвём. Первый пример был для наглядности
new MenuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
    'big'                 //тестовый класс, ну просто убедиться что всё работает

).render();

new MenuCart(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан',
    5,
    '.menu .container',
    'menu__item'


).render();


new MenuCart(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    10,
    '.menu .container',
    'menu__item'

).render();



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

        //Мы можем переделать наш элемент в formData в объект JSON 
        //для этого существует вот такой приём
        const object = {};
        formData.forEach(function(value, key){
            //формируем объект
            object[key] = value;
        }); 

        //теперь когда у нас есть ОБЫЧНЫЙ ОБЪЕКТ мы можем спарсить его в json
        const json = JSON.stringify(object);

  
                         //Fetch() - будем отправлять данные с помощью ФЕТЧА
        //1)куда обращаемся "server.php"
        //2)идёт ОБЪЕКТ {} его будем наполнять данными. Описывать их нет смысла ибо и так всё видно и понятно
        fetch('server.php',{
            method : 'POST',
            //если отправляешь formData то заголовки НЕНУЖНЫ. Если json НУЖНЫ.
            headers: {
                'Content-type': 'application/json',
            }, 
            body: json
            //теперь мы выполним те же действия что были при положительном исходе, только когда мы 
            //писали запрос через XmlHTTPrequest(я для примера оставлю старый код проверки на 
            // request.addEventListener('load',()=>{      он ниже будет
        }).then((data)=>{
            return data.text();
        }).then((data)=>{
            console.log(data);
            showThanksModal(message.success);

            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        });
       


                                //СТАРЫЙ КОД ДЛЯ ПРОВЕРКИ через XmlHTTPrequest
        //теперь отследим загрузку на сервер. Воспользуемся событием load.(сработает когда получим ответ от сервера)
        /*         request.addEventListener('load',()=>{
                    //статус 200 эт всё ок
                    if(request.status == 200)
                    {
                        console.log(request.response);

                        //не забываем про статусмесседж. Надо сказать мол спасибо данные отправленны.
                        //ток реализуем через функцию
                        showThanksModal(message.success);


                        //очищаем форму. Можем взять форму и перебрать value наших input  и очистить их 
                        //либо в наглую воспользоваться спец командой reset
                        form.reset();

                        statusMessage.remove();
                        
                    }
                    else
                    {
                        //а тут скажем что всё плохо Но так же сделаем через нашу новую функцию
                        showThanksModal(message.failure);
                    }
                }); */
                                //СТАРЫЙ КОД ДЛЯ ПРОВЕРКИ через XmlHTTPrequest ЗАКОНЧИЛСЯ
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



























});