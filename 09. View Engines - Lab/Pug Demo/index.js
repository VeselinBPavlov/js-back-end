let express = require('express');
let app = express();
const port = 1337

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello from Express!',
        subtitle: 'And from Pug!',
        myArray: [1, 2, 3, 4, 5]
    }); 
});

app.listen(port);

console.log(`Server is listening on port ${port}...`)