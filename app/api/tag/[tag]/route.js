import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		const posts = await Post.find({ tag: params });
		return new Response(JSON.stringify(posts), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
