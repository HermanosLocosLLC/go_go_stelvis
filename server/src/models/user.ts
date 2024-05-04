import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { Password } from '../utils/password'

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  firstName: string
  lastName: string
  email: string
  password: string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
    timestamps: true,
  },
)

userSchema.pre('save', async function () {
  // IF PASSWORD IS NOT MODIFIED, DO NOT HASH THE PASSWORD
  if (!this.isModified('password')) return

  const hashedPassword = await Password.toHash(this.password)
  this.password = hashedPassword
})

userSchema.methods.comparePassword = async function (providedPassword: string) {
  const isMatch = await Password.compare(this.password, providedPassword)
  return isMatch
}

userSchema.methods.createJwt = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
