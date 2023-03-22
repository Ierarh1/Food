fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body:   JSON.stringify({name: 'Andrei', profit: '5700$'}),
    headers:{
        'Content-type': 'application/json',
    },
})
.then(response => response.json())
.then(json => console.log(json))







fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify({name: 'Andrei', profit: '7000$'}),
    headers:{
        'Content-type': 'application/json'
    }
})
      .then(response => response.json())
      .then(json => console.log(json))