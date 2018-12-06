const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/tests", express.static(path.join(__dirname, '/tests/scripts')));
app.use("/dist", express.static(path.join(__dirname, '/dist/standalone')));
app.use('/favicon.ico', express.static('resources/CCF_FAB_Icon.png'));

app.use((request, response, next) => {
  console.log(request.headers);
  next();
});

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broke!');
  });


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'tests/views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'tests/views'));

app.get('/', (request, response) => {
    response.render('home', {
    });
  });

  app.listen(5002, () => console.log('Server is listening on port 5002!'));
