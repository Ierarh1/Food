"use strict";

console.log('Подготовка запроса');

const req3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log('Создание объекта');
        const obj2 = {
            human: 'yes',
            age:   21,
            profit:'4700$',
        };
        resolve(obj2);
    }, 2000);
}).then((data)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('Модификация объекта');
            data.name = 'Andrei';
            resolve(data);
        }, 2000);
    });
}).then((data)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('продолжаем модифицировать');
            data.work = 'programmist';
            resolve(data);
        }, 2000);
    })
}).then((data)=>{
    console.log('Результат');
    console.log(data);  
}).finally(()=>{
    console.log('Блок файнали');
});








const test = (time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, time);
    });
};

//ждём пока нормально отработает первый промис
Promise.race([test(3000), test(1000)]).then(()=>{
    console.log('отработал первый промисс на 1000');
});



//test(1000).then(()=>{console.log('1000ms')});
//test(2000).then(()=>{console.log('2000ms')});

//ждёт пока все промисы отработают
Promise.all([test(2000),test(3000)]).then(()=>{
    console.log('отработал промисОЛЛ')
});
























const promis = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log('создание объекта');
        const element = {
            name: 'Andrei',
            human: 'no'
        }
        resolve(element);
    }, 2000);
}).then((element)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            element.machine = 'yes';
            console.log('модификация объекта');
            resolve(element);
        }, 2000);
    });
}).then((element)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('добавление результат объекта');
            element.profit = '5000$';
            resolve(element);
        }, 2000);
    });
}).then((result)=>{
    console.log(result);
});






const IWLB = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log('подготовка данных');
        resolve();
    }, 2000);
}).then(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('создание данных');
            const obj ={
                name: 'Andrei',
                human: 'No'
            };
            resolve(obj);
        }, 2000);
    });
}).then((data)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('модификация данных');
            data.machine = 'Yes';
            resolve(data);
        }, 2000);
    });
}).then((data)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('нормализация данных');
            data.profit = '17000$'
            resolve(data);
        }, 2000);
    });
}).then((data)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('Передача данных');
            resolve(data);
        }, 2000);
    });
}).then((data)=>{
    console.log('окончательные данные');
    console.log(data);
});