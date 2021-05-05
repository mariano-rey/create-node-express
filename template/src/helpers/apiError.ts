import { CustomError } from 'ts-custom-error'

interface Props {
  message: string
  code: number
}

class ApiError extends CustomError {
  code: number
  public constructor(props: Props) {
    const { message, code } = props
    super(message)
    this.code = code
  }
}

export default ApiError
