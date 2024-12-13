const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT ||  5000;
    // middleware
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173', "https://book-store-frontend-iota.vercel.app",'http://localhost:3000/api/v1/books'],
        credentials: true,
    }
))
    // routes
const bookRoutes = require('./src/books/book.route.js')
const orderRoutes = require('./src/orders/order.route.js')
const userRoutes = require('./src/users/user.route.js')
const adminRoutes = require('./src/stats/admin.stats.js')

app.use("/api/v1/books", bookRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/auth", userRoutes)
app.use('/api/v1/admin', adminRoutes)
    


async function main() {
    await mongoose.connect(process.env.DB_URI);
    app.use('/x', (req, res) => {
        res.send("Book Store Server is running!")
    })
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().then(() => console.log("Db Connected Successfully!")).catch(err => console.log(err));

    app.get('/',(req, res) => {
        res.send('<h1> Hello from server </h1>')
    })

    app.listen(port, () => {
        console.log(`Listening on port ${port}`) 
    })