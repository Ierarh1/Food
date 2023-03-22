                                               
                                               
                                               //FIlter - фильтрует

//ВОЗВРАЩАЕТ НОВЫЙ МАССИВ
const names = ['Andrei','Ann','Julia','Marianna','fortivanna'];

//получим все имена которые меньше чем 6 символов
//работает так, перебирает все элементы и возвращает нам только те которые подходят под условия
//name = как мы везде писали item
const shortNames = names.filter((name)=>{
    if(name.length<6)
    {
        return name;
    }
});

//КРАТКИЕ ВЕРСИИ
//1-первая
const result2 = namesMass.filter((name)=>{
    if(name.length<5) return name;
});
//2-вторая
const result3 = namesMass.filter((name)=>{return name.length<5});
//3-третья
const result4 = namesMass.filter(name=>name.length<5);


console.log(shortNames);
console.log(shortNames2);



                                                //Map  - модиифицирует

//ВОЗВРАЩАЕТ НОВЫЙ МАССИВ
//Данный метод позволяет выбрать какие либо элементы МОДИФИЦИРОВАТЬ их и вернуть новый массив
//p.s forEach тоже так умеет но он МОДИФИЦИРУЕТ СТАРЫЙ МАССИВ

//есть массив. Скажем получили ответы от пользователя.
const answers = ['AnDrei','AnnA','JuliA','MaRiaNna','FortivANNA'];


//хотим данные в НОРМАЛЬНОМ формате,  с нормальным регистром
const res = answers.map((item)=>{
    return item.toLocaleLowerCase();
});

//КРАТКАЯ ВЕРСИЯ
const res1 = answers.map(item=> item.toLocaleLowerCase());

console.log(res1);



                                                //every/some
                                            //возвращают BOOLEAN

//some перебирает массив, и если у нас хотя бы один какой либо элемент подходит
//по какому либо условию то массив вернёт TRUE
const testSome = [4,5,'dsad','4asd'];


                                            //some

//проверим есть ли в массиве хотя бы одно число
//опять краткая форма(НЕЗАБЫВАЙ ЧТО ЕСЛИ без {} то return не пишется)
console.log(testSome.some(item=> typeof(item)=='number'));  


                                            //every

//every перебирает массив, и если у нас ВСЕ элементы подходят
//по какому либо условию то массив вернёт TRUE
console.log(testSome.every(item=> typeof(item)=='number'));  



                                            //reduce

 //Нужен для того что бы схлопывать  элементы в массиве в одно единственное значение.
 //можно складывать вычитать.......ну попробуем сложение, ибо оно проще
 const arr = [5,1,4,65436,3,2,5,666];

    //ВАЖНО reduce может принимать так же ТРЕТИЙ аргумент - НАЧАЛЬНОЕ ЗНАЧЕНИЕ
    //подкинем например 3(ТРОЙКУ)
 const res99 = arr.reduce((sum,current)=>sum + current,3);

 //это метод перебора он проходит по каждому элементу который есть в массиве
 //p.s изначально sum == 0
 //current - это что-то типа item, каждый перебираемы элемент(5,1,4.....)
 //на первом заходе sum == 5 затем 6 затем 10...
 //т.е sum каждый раз автоматически обновляется а current остаётся тем же

 console.log(res99);


                               //попробуем reduce но уже со строками

const arr2 = ['.exe','.pdf','.zip','.rar','.etc'];

//хотим строку которая через запятую будет содержать все те переменные что в массиве выше

const res109 = arr2.reduce((sum,current)=> sum + ', ' + current);

console.log(res109);


                                        //попрбуем применить данные знания
                                
const obj = {
    Andrei:  'persone',
    Julia :  'persone',
    dog   :  'animal',
    cat   :  'animal'
}
//как видно мы получили объект в каком то неадекватном состоянии. Перепутаны местами key и value

//сразу сталкиваемся с тем что у оьъекта НЕМОГУТ БЫТЬ два одинаковых свойства. Поэтому поменять местами
//key и value не желательно.
//ЗАДАЧА получим ВСЕ ИМЕНА('persone')

//превратим объект в матрицу массивов, т.е у нас будет массив внутри которого будут массивы
const newArr = Object.entries(obj);
console.log(newArr);
/*Получим вот что
[
  [ 'Andrei', 'persone' ],
  [ 'Julia', 'persone' ],
  [ 'dog', 'animal' ],
  [ 'cat', 'animal' ]
]
массив массивов
*/
//кстати тк Object.entries(obj); вернёт нам массив,  а значит у него есть все те же методы что и у массива map filter...
//поэтому мы можем попробовать ЧЕЙНИНГ, т.е вызывать методы прям на Object.entries(obj)

const newArr1 = Object.entries(obj)
.filter(item => item[1] === 'persone')   //возвращаем подмассывы где 2 элемент 'persone'. Результат [ [ 'Andrei', 'persone' ], [ 'Julia', 'persone' ] ]
.map(item => item[0])                  //возвращаем только перые элементы. Результат [ 'Andrei', 'Julia' ]  
console.log(newArr1);






var isSquare = function(n){

    if(n<=3)
    {
        if(n==0)
        {
            return true;
        }
        else
        {
            return false;
        }
        
    }
    else
    {
        if(Number.isInteger(Math.sqrt(n))) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }


}

console.log(isSquare(2));