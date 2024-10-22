import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import '../../container'

import express from 'express'

import cors from 'cors'
import routes from './routes'
import error from '../../middlewares/error'
import env from '../../config/environment-variables'

import { DataSourceOptions } from 'typeorm'
import DataSourceManager from '../typeorm/helpers/data-source-manager'
import dataSourceOptions from '../typeorm/config/data-source'

const PORT = env.PORT

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(error)

const connection = DataSourceManager.getInstance()
connection
  .createDataSource(
    'default',
    dataSourceOptions.get('default') as DataSourceOptions,
  )
  .then(() => {
    const isInitialized = connection.getDataSource('default')?.isInitialized

    if (isInitialized) {
      console.log('Database connected!')

      app.listen(PORT, () => {
        console.log('Server is running on port', PORT)
      })
    }
  })
