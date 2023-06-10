import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	nickname: {
		type: String,
	},

	tag: {
		type: String,
	},
	post: {
		type: String,
	},
	timeStamp: {
		type: Date,
	},
	likes: {
		type: Array,
	},
	comments: {
		type: Array,
	},
});

const Post = models.Posts || model("Posts", PostSchema);

export default Post;
