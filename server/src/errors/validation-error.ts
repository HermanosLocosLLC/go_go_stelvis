export class ValidationError extends Error {
  msg: string
  param: string

  constructor(msg: string, param: string) {
    super(msg)

    this.msg = msg
    this.param = param

    Object.setPrototypeOf(this, ValidationError)
  }
}
