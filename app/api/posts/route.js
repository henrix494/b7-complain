import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const dynamic = "force-dynamic";
export const revalidate = 5;
export const fetchCache = "force-no-store";
export const GET = async (request) => {
	try {
		await connectToDB();
		const posts = await Post.find().sort({ timeStamp: -1 });
		Post.watch().on(`change`, (data) => {
			return new Response(JSON.stringify(posts), {
				status: 200,
			});
		});
		return new Response(JSON.stringify(posts), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
};
