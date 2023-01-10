const express = require('express')
const app = express()
const connectDB = require('./config/database')
const passport = require('passport')
const session =  require('express-session')
const MongoStore =  require('connect-mongo')
const flash = require('express-flash')
const methodOverride = require('method-override')
const logger = require('morgan')
const mainRoutes = require('./routes/main')
const adminRoute  =  require('./routes/admin')
const checkoutRoute = require('./routes/checkout')
const product = require('./routes/product')

// connecting my app with the environmetn variables
require('dotenv').config({ path: './config/.env'})

require('./config/passport')(passport)

connectDB()



/**
 * ...............GENERAL CONFIGURATION................
 * 
 */


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded( { extended : true}))
app.use(express.json())
app.use(logger('dev'))


app.use(methodOverride('_method'))

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.DB_STRING,
    })
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

// my routes
app.use('/', mainRoutes)
app.use('/admin', adminRoute)
app.use('/checkout', checkoutRoute)
app.use('/products', product)


// connecting my server

app.listen(process.env.PORT, () => {
    console.log('server is running. Move!!!')
})