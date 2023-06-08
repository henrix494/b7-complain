import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (request, { params }) => {
	const id = params.id;
	try {
		await connectToDB();
		const posts = await User.findOne({ _id: id });
		return new Response(JSON.stringify(posts), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
};
