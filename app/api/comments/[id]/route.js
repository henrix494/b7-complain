import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
export const PUT = async (req, { params }) => {
	const id = params.id;
	const { comments } = await req.json();

	try {
		await connectToDB();
		const post = await Post.findOneAndUpdate(
			{ _id: id },
			{ $push: { comments: comments } },
			{ new: true }
		);

		return new Response(JSON.stringify(post), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
