import mongoose from 'mongoose'

try {
    await mongoose.connect('mongodb://localhost:27017/qlgiasu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true });
    console.log("Connectec!!")
  } catch (error) {
    mongoose.connection.on('error', err => {
        logError(err);
      });;
  }