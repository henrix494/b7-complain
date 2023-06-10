import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	email: {
		type: String,
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
	image: {
		type: String,
	},
	numberOfPosts: {
		type: Number,
		default: 0,
	},
	numberOfComments: {
		type: Number,
		default: 0,
	},
	postsLiked: {
		type: Array,
	},
});

const User = models.User || model("User", UserSchema);

export default User;
