import express from 'express'
import ask from './src/api/ask.js'
import { config } from 'dotenv'
import cors from 'cors';

config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/ask', ask)
app.use('/', (req, res) => {
  res.send('Welcome to Danmasani AI')
})


app.listen(PORT, () => console.log(`connected on PORT ${PORT}`))
