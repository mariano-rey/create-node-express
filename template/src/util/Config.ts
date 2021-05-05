import dotenv from 'dotenv'
import path from 'path'
import { exit } from 'process'
dotenv.config()

type ENV_TYPE = 'development' | 'production' | 'test'
const { PORT, NODE_ENV, MONGODB, DB_NAME, MONGO_PARAMS } = process.env
if (!PORT || !NODE_ENV || !MONGODB || !DB_NAME) {
  let error = 'The following enviroment varialbes must be configured:'
  error += '\nPORT'
  error += '\nNODE_ENV'
  error += '\nMONGODB'
  error += '\nDBNAME'
  console.log(error)
  exit(0)
}

const dirFiles = path.join(__dirname, '../../files')

export default {
  NAME: '',
  PORT: process.env.PORT,
  NODE_ENV: NODE_ENV as ENV_TYPE,
  MONGODB,
  DB_NAME,
  MONGO_PARAMS: MONGO_PARAMS || '',
  DIR_FILES: dirFiles,
  PASS_DEF: process.env.PASS_DEF,
  SALTROUND: 10,
  SECRET: process.env.SECRET,
}
