import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  name: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (actualDocument, convertedDocument) => {
    convertedDocument.id = convertedDocument._id

    delete convertedDocument._id
    delete convertedDocument.__v
    delete convertedDocument.password

    return convertedDocument
  },
})

const User = mongoose.model('user', userSchema)

export default User
