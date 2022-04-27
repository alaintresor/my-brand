const mongoose =require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

// const { MONGO_URL } = process.env;

// exports.dbConnect = () => {
//   mongoose
//     .connect(MONGO_URL, {

//       useNewUrlParser: true,
//     })
//     .then(() => console.log('Connected to DB'));
// };
// module.exports =dbConnect;


exports.dbConnect = async () => {
	try {
		const conn = await mongoose.connect(
			process.env.NODE_ENV === 'production'
				? process.env.MONGO_PROD_URL
				: process.env.NODE_ENV === 'test'
				? process.env.MONGO_TEST_URL
				: process.env.MONGO_URL,
			{useNewUrlParser: true,},
		);

		console.log(
			'Connection has been established successfully...',
		);
	} catch (err) {
		console.log(`Error: ${err.message}`);
		process.exit(1);
	}
};

