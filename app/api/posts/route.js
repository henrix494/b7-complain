import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, res) => {
	try {
		await connectToDB();
		const posts = await Post.find().sort({ timeStamp: -1 });
		return new Response(JSON.stringify(posts), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
};
