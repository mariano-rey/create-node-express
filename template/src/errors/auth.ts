import { ErrorMessage } from '../helpers/errors'
import { Types } from './index'

interface ErrorResponse {
  ExpiratedToken: ErrorMessage
  NoToken: ErrorMessage
  NoUser: ErrorMessage
  NoPassword: ErrorMessage
  WithoutPermisions: ErrorMessage
  IncorrectPassword: ErrorMessage
  IncorrectUser: ErrorMessage
  MismatchPassword: ErrorMessage
}

const generateError = (): ErrorResponse => {
  const intialCode = Types.auth
  return {
    ExpiratedToken: {
      message: 'El TOKEN ha expirado, se debe volver a iniciar sesión',
      code: intialCode,
    },
    NoToken: { message: 'No se pasó ningún token', code: intialCode },
    NoUser: { message: 'Usuario obligatorio', code: intialCode },
    NoPassword: { message: 'Contraseña obligatoria', code: intialCode },
    WithoutPermisions: { message: 'El usuario no tiene permisos', code: intialCode },
    IncorrectPassword: { message: 'La contraseña es incorrecta', code: intialCode },
    IncorrectUser: { message: 'El usuario es incorrecto', code: intialCode },
    MismatchPassword: { message: 'Las contraseñas no coinciden', code: intialCode },
  }
}

export default generateError()
