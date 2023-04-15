                                                //localStorage
    
    /*
       Данная технология позволяет сохранять данные на сайте без работы с сервером и базами данных
       И вся эта информация останется на сайте даже если мы перезагрузим страницу и даже закроем браузер
       p.s поддерживаемость у неё большая поэтому можно смело использовать  
       
       localStorage - это объект который встроен в браузер и  он может хранить различные данные
       если капнуть глубже то по факту localStorage это свойство глобального объекта window
    
       window.localStorage - этот объект уникален для каждого домена, это сделано из соображений безопасности
       найти localStorage можно зайдя в окно разработчика на сайте и открыть вкладку хранилище
       p.s  в google Chrom(application=>storage=>localStorage)

       localStorage может использоваться в огромном количестве случаев, например если человек устанавливает свои 
       настройки сайта и при повторомном входе на него всё останется на своих местах. Или установить какие нибудь
       данные формы, или запомнить время  где пользователь остановился при просмотре видео и потом продолжить с него...
    
       Самое главное это помнить,  что localStorage существует внутри одного домена и служит для хранения локальных данных
       Объект НЕ РЕЗИНОВЫЙ нефиг забивать всякой фигнёй, примерный объём около 5МБ - инфы, поэтому затолкать сюда настоящую
       большую базу данных неполучится
    */

// для работы с  localStorage надо знать всего 4 команды


                                            //1-команда для localStorage
                                      //для запипис/перезаписи ключей-значений

// 1 -аргумент ЗАПИСЫВАЕТ НОВЫЙ КЛЮЧ   'numner'
// 2 -аргумент ЗАПИСЫВАЕТ ЗНАЧЕНИЕ        5
localStorage.setItem('numner',5);

//Всё теперь у нас запишется клюс 'numner' со значением 5.
//ВНИМАНИЕ если же ключ 'numner' уже БЫЛ, то значение перезапишется


                                            //2-команда для localStorage
                                           //для палучения ключей-значений

//внутри указывается КЛЮЧ
localStorage.getItem('numner');


                                            //3-команда для localStorage
                                        //точечное удаление ключей-значений
//удаляется так же по ключу                                             
localStorage.removeItem('number');


                                            //4-команда для localStorage
                                        //ПОЛНОЕ удаление ВСЕХ ключей-значений
//аргументы никакие не нужны, ты просто очищаешь весь localStorage
localStorage.clear();