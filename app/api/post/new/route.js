import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (req) => {
	const { userId, nickname, tag, post, timeStamp } = await req.json();
	try {
		await connectToDB();
		const newPost = new Post({
			userId: userId,
			nickname: nickname,
			tag: tag,
			post: post,
			timeStamp: timeStamp,
			likes: [],
			comments: [],
		});
		await newPost.save();
		return new Response(JSON.stringify(newPost), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
