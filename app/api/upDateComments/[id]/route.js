import User from "@/models/user";
import { connectToDB } from "@/utils/database";
export const PATCH = async (req, { params }) => {
	const id = params.id;

	try {
		await connectToDB();
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $inc: { numberOfComments: -1 } },
			{ new: true } // Return the updated document
		);
		return new Response(JSON.stringify(user), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
	}
};
