import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(
      'MongoDB connected:',
      connect.connection.name,
      connect.connection.host
    )
  } catch (error) {
    console.log('Error connecting MongoDB:', (error as Error).message)
    /* process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code.
    Code 1 means exit with failure, 0 means success. */
    process.exit(1)
  }
}
