/*

4) Запишите результат предыдущей функции в переменную tranformedArray. Напишите функцию checkFilms, которая будет проверять, что в каждом из фильмов есть поле id. Если это так - функция возвращает true. Очевидно, что сейчас условие должно выполняться, если мы передаем checkFilms(tranformedArray); :)


*/

const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];






function setFilmsIds(arr) {
    const f1 = arr.map((value,key)=>{
        value.id = key;
        return value;
    });
    return f1;
   
}

const tranformedArray = setFilmsIds(films);




function checkFilms(arr) {
    
}


console.log(checkFilms(tranformedArray));










function showGoodFilms(arr) {
    const result =  arr.filter((item)=>{
        if(item.rating >=8)
        {
            return item;
        }
    });

    return result;
}

function showListOfFilms(arr) {
    const f = arr.map((item)=>{
        return item.name;
    }).join(', ');

    return f;
}





/* 
[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this" */

 const names = ["Alex", "Jacob", "Mark", "Max"]; 

let someText = '';

switch (names.length) {
    case '0':
        someText = `no one likes this`;
        break;
    case '1':
        someText = `${names[0]} likes this`
        break;
    case '2':
        someText = `${names[0]} and ${names[1]} like this`;
        break;
    case '3':
        someText = `${names[0]}, ${names[1]} and ${names[2]} like this`;
        break;
    default:
        someText = `${names[0]}, ${names[1]} and ${names.length -2} others like this`;
    break;

}
if(names <0)
{
    someText = `no one likes this`;
}

console.log(someText);




