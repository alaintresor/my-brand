const mongoose = require("mongoose")

const schema = mongoose.Schema({
 
	title: {
		type:String,
		required:[true,'Please add a title'],
	},
	content: {
		type:String,
		required:[true,'Please add a content'],
	},
	postedDate:String,
	comments:[{
		user_id:{
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			ref:"User",
		},
		comment:{
			type:String,
			required:[true,'Please add a comment'],
		},
		postedDate:{
			type:String,
			required:true
		}
	}
	],
	likes:[{
		user_id:{
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			ref:"User",
		}
	}]
},{
	timeStamps:true
}
)

module.exports = mongoose.model("article", schema)