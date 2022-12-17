const express = require('express');

const { engine } = require('express-handlebars');
var methodOverride = require('method-override');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

const db = require('./config/db');
const route = require('./routes');

//COOKIE
app.use(cookieParser());

// Method override
app.use(methodOverride('_method'));

// Apply middleware
app.use(express.urlencoded());
app.use(express.json());

route(app);
db.connect();

// Templet engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: { sum: (a, b) => a + b, pricerTichket: (a, b) => parseInt(a) + b },
  })
);
app.set('view engine', '.hbs');
app.set('views', 'src/views');

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}`);
});
