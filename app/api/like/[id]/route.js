import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PUT = async (req, { params }) => {
	const Id = params.id;
	const { userId } = await req.json();
	console.log(userId);
	try {
		await connectToDB();
		const post = await Post.findOneAndUpdate(
			{ _id: Id },
			{ $push: { likes: userId } },
			{ new: true }
		);
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{
				$push: { postsLiked: Id },
			},
			{ new: true }
		);
		console.log(post);
		return new Response(JSON.stringify(post), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
