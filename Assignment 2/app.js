const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     console.log('This is middleware #1!');
//     next();
// })

// app.use((req, res, next) => {
//     console.log('This is middleware #2!');
//     next();
// })

// app.use((req, res, next) => {
//     console.log('This is middleware #3!');
//     res.send('<h1>Hello!</h1>')
// })
app.use('/users', (req, res, next) => {
    res.send('<h1>Users request!</h1>');
})

app.use('/', (req, res, next) => {
    res.send('<h1>Root request!</h1>');
})

app.listen(3000);