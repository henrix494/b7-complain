import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const PATCH = async (request, { params }) => {
	const id = params.id;

	try {
		await connectToDB();
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $inc: { numberOfPosts: -1 } },
			{ new: true } // Return the updated document
		);
		return new Response(JSON.stringify(user), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
