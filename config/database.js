const  mongoose =  require('mongoose')

const connectDB = async () => {

    try {
        let conn = await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log(`${conn.connection.host}`)
        
    } catch (error) {
        console.error(error)
    }
}


module.exports = connectDB