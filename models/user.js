import { hash } from "bcryptjs";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	email: {
		type: String,
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
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
	password: {
		type: String,
	},
	isVerafied: { type: Boolean },
});

const User = models.User || model("User", UserSchema);

export default User;
