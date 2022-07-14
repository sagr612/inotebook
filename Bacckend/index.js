const connectToMongo = require('./db');
const express = require('express');
const { json } = require('express');
var cors = require('cors')
connectToMongo();

const app = express()
app.use(cors())
const port = 5000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Deepak')
})

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Inotebook app listening on port ${port}`)
})