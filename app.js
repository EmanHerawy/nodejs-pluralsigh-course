const express = require('express');
// tips to change any word  everywhere just  press ctrl + f2
const chalk = require('chalk'); // to colour the console log message
const debug = require('debug')('app'); // nice way to log and debug ur app 
// to make it work u need to run DEBUG=* npm start  .. if you want to debug all 
// DEBUG=app npm start  to debug only files with app keyword 
const morgan = require('morgan'); // to log info about you routing 
const path = require('path')
//nodemon 

const port = process.env.PORT || 3000
const app = new express();
// to serve static files
app.use(express.static(path.join('public')))
app.use('/css', express.static(path.join('./node_modules/bootstrap/dist/css/')))
app.use('/js', express.static(path.join('./node_modules/bootstrap/dist/js/')))
app.use('/js', express.static(path.join('./node_modules/jquery/dist/')))
// app.use(morgan('combined'))
app.use(morgan('tiny')) // less information 
app.set('views', './src/views/');
app.set('view engine', 'pug');
app.get('/', (erq, res) => {
    // res.send('hello from express test page')
    //  res.sendFile(path.join(__dirname, 'views', 'index.html'))
    // use pug template engine
    // simplist case 
    // res.render('index')
    // to send some data 
    res.render('index', {
        list: ['a', 'b']
    })
})

app.listen(port, () => {
    debug('listening to port ', chalk.green(port));

})