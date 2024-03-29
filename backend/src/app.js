const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const { errors } = require('celebrate')
const cors = require('cors')
const Person = require('./models/person')

const mongooseConnection = require('./database-connection')
const socketService = require('./socket-service')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const offersRouter = require('./routes/offers')
const commentsRouter = require('./routes/comments')
const accountRouter = require('./routes/account')

const app = express()

app.use(
  cors({
    origin: app.get('env') == 'development' ? true : 'https://frontend-eu5nphth4a-ew.a.run.app',
    credentials: true,
  })
)

app.set('trust proxy', 1)

// Live Reload for backend view (only in dev)
// if (app.get('env') == 'development') {
//   /* eslint-disable-next-line */
//   app.use(require('connect-livereload')())
//   /* eslint-disable-next-line */
//   require('livereload')
//     .createServer({ extraExts: ['pug'] })
//     .watch([`${__dirname}/public`, `${__dirname}/views`])
// }

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

app.set('io', socketService)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: [
      'thisisasupersecuresecretsecretsecretssecretki',
      'superextrasecretsecretsuperextrasecretsecretsuperextrasecretsecret',
    ],
    store: MongoStore.create({ mongoUrl: mongooseConnection._connectionString, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV == 'production',
    },
    // resave: false,
    // saveUninitialized: false,
  })
)

// Configure passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Configure passport-local to use account model for authentication

passport.use(Person.createStrategy())

passport.serializeUser(Person.serializeUser())
passport.deserializeUser(Person.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())
// app.use(helmet.contentSecurityPolicy())
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       'script-src': ["'self'", 'frontend-eu5nphth4a-ew.a.run.app'],
//       'style-src': null,
//     },
//   })
// )

app.use(mongoSanitize({ replaceWith: '_' }))

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  req.session.viewCount++
  next()
}) // saves number of times user visited api in cookie as number :)

app.use('/api/', indexRouter)
app.use('/api/account', accountRouter)
app.use('/api/users', usersRouter)
app.use('/api/offers', offersRouter)
app.use('/api/comments', commentsRouter)

app.use(errors())

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)

  res.send({
    status: err.status,
    message: err.message,
    stack: req.app.get('env') == 'development' ? err.stack : '',
  })
})

module.exports = app
