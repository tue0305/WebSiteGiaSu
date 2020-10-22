require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const React = require ('react');
const ReactDOM = require ('react-dom');
require('express-async-errors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// admin handler
const AdminBro = require('admin-bro')
const passwordFeature = require('@admin-bro/passwords')
const bcrypt = require('bcryptjs')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const app = express()
AdminBro.registerAdapter(AdminBroMongoose)
require('./models/schedule.model')
require('./models/subject.model')
require('./models/class.model')
const User = require('./models/user.model')
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
})

const run = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  const AdminBro = new AdminBro({
    databases: [connection],
    //... other AdminBroOptions
  })
  //...
}
const options = {
  resources: [{
    resource: User,
    options: {
      properties: { encrypted: { isVisible: false } },
    },
    features: [passwordFeature({
      // PasswordsOptions
      properties: {
        // to this field will save the hashed password
        encryptedPassword: 'encrypted'
      },
      hash: bcrypt.hash,
    })]
  }]
}
const adminBro = new AdminBro({
  branding: {
    companyName: 'TutorViking',
  },
  databases: [mongoose],
  rootPath: '/admin',
  options,
  favicon: '/public/favicon/favicon'

})

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))


//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const adminRouter = require('./routes/admin');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(express.static(__dirname + '/configuration/'));
app.use(express.static(__dirname + '/views/'));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
