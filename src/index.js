const express = require('express');
const { PrismaClient } = require('./generated/client');
const app = express();
const prisma = new PrismaClient();

//   Xử lý JSON data
app.use(express.json());
//  // Xử lý x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./Router/api'));


app.get('/', (req, res) => {
 res.send('Hello World');
});


app.listen(3003, () => {
 console.log('Server is running on port 3003');
});