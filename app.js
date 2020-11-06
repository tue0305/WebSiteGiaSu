require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
require('express-async-errors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('flash')

// admin handler
const AdminBro = require('admin-bro')
const passwordFeature = require('@admin-bro/passwords')
const bcrypt = require('bcryptjs')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
AdminBro.registerAdapter(AdminBroMongoose)

const app = express()

require('./models/subject.model')
require('./models/class.model')
const User = require('./models/user.model')
// ===========================Connection=================
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
  })
// ==========================ADMIN SETUP====================
const canModifyUser = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'ADMIN'
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
      properties: { Password: { isVisible: false } },
      password: {
        type: 'string',
        isVisible: {
          list: false, edit: true, filter: false, show: false,
        },
      }, 
    },
    actions: {
      new: {
        before: async (request) => {
          if(request.payload.password) {
            request.payload = {
              // ...request.payload,
              Password: await bcrypt.hash(request.payload.password, 10),
              password: undefined,
            }
          }
          return request
        }, 
      edit: { isAccessible: canModifyUser },
      delete: { isAccessible: canModifyUser },
      new: { isAccessible: canModifyUser },
    }
    }
  }],
  
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
const authenticate_router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME,
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
  authenticate: async (email, password) => {
    const user = await User.findOne({Email:email})
    if (user) {
      const matched = await bcrypt.compare(password, user.Password)
      if (matched && user.Role === 'ADMIN' && user.Active) {
        return user
      }
    }
    return false
  },

})
app.use(adminBro.options.rootPath, authenticate_router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
//===============================ROUTES================
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const classRouter = require('./routes/class');
//===============================VIEW ENGINE=======================
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/configuration/'));
app.use(express.static(__dirname + '/views/'));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/class', classRouter);


//================== catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//================= error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// app.debug(true)
