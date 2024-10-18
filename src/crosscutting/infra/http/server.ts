import 'express-async-errors'
import 'dotenv/config'

import express from 'express'

import cors from 'cors'
import routes from './routes'
import error from '../../middlewares/error'

const APP_PORT = process.env.APP_PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(error)

app.listen(APP_PORT, () => {
  console.log('Server is running on port', APP_PORT)
})
