import dotenv from 'dotenv'
import path from 'path'
import { exit } from 'process'
dotenv.config()

type ENV_TYPE = 'development' | 'production' | 'test'
const { PORT, NODE_ENV, MONGODB, DB_NAME, MONGO_PARAMS } = process.env
if (!PORT || !NODE_ENV || !MONGODB || !DB_NAME) {
  let error = 'Se debe configurar las siguientas variables de entorno:'
  error += '\nPORT'
  error += '\nNODE_ENV'
  error += '\nMONGODB'
  error += '\nDBNAME'
  console.log(error)
  exit(0)
}

const dirArchivos = path.join(__dirname, '../../files')

export default {
  NAME: 'Precios Cuidados',
  PORT: process.env.PORT,
  NODE_ENV: NODE_ENV as ENV_TYPE,
  MONGODB,
  DB_NAME,
  MONGO_PARAMS: MONGO_PARAMS || '',
  DIR_ARCHIVOS: dirArchivos,
  PASS_DEF: process.env.PASS_DEF,
  SALTROUND: 10,
  SECRETA: process.env.SECRETA,
}
