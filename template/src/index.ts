import compression from 'compression'
import express, { json } from 'express'
import cors from 'cors'
import routes from './routes'
import Config from './util/Config'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'

const app = express()
app.use(helmet())
app.use(morgan('tiny'))
app.listen(Config.PORT, () => {
  console.log(`Listening ${Config.NAME} on PORT ${Config.PORT}`)
})

app.use(cors())
app.use(compression())
app.use(json({ limit: '15MB' }))
app.use('/api', routes())
app.use('/files', express.static(Config.DIR_FILES)) // CHANGE ROUTE FOR FILES
app.use(express.static(path.join(__dirname, '../frontend')))
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const dbFinalName = `${Config.DB_NAME}-${Config.NODE_ENV.substring(0, 4).toUpperCase()}`
const finalName = `${Config.MONGODB}${dbFinalName}`

mongoose.connect(finalName, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log(`Conected to ${finalName}`)
})

export default app
