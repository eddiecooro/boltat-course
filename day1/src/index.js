fetch('https://jsonplaceholder.typicode.com/todos')
  .then(res => res.json())
  .then(json => console.log(json));
