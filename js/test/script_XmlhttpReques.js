

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