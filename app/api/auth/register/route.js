import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST = async (request) => {
	const { name, password, email } = await request.json();
	let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
	await connectToDB();
	const hashedPassword = await bcrypt.hash(password, 5);
	const userExsist = await User.findOne({ username: name });
	if (userExsist) {
		return new Response(JSON.stringify("שם משתמש קיים"), { status: 401 });
	}
	if (name.length < 6) {
		return new Response(JSON.stringify("שם משתמש קצר"), { status: 401 });
	}
	if (!regex.test(email)) {
		return new Response(JSON.stringify("אימייל לא חוקי"), { status: 401 });
	} else {
		const newUser = new User({
			username: name,
			email,
			password: hashedPassword,
			isVerafied: false,
			numberOfPosts: 3,
			numberOfComments: 5,
		});
		try {
			await newUser.save();
			return new NextResponse("User has been created", { status: 201 });
		} catch (error) {
			console.log(error);
		}
	}
};
