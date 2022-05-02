const mongoose =require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
console.log('hello')
const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect(MONGO_URL, {

      useNewUrlParser: true,
    })
    .then(() => console.log('Connected to DB'));
};
// module.exports =dbConnect;