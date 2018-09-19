let express = require('express');
let app = express();
let handlebars = require('express-handlebars');
const port = 1337;

app.engine('.hbs', handlebars({
    extname: '.hbs',
    partialsDir: 'views/partials'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello from Express!',
        subtitle: 'And from Handlebars!'
    }); 
});

app.listen(port);

console.log(`Server is listening on port ${port}...`)