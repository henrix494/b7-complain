import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			async signIn({ account, profile, user, credentials }) {
				try {
					await connectToDB();

					// check if user already exists
					const userExists = await User.findOne({ email: profile.email });

					// if not, create a new document and save user in MongoDB
					if (!userExists) {
						await User.create({
							email: profile.email,
							username: profile.name.replace(" ", "").toLowerCase(),
							image: profile.picture,
							numberOfPosts: 5,
							numberOfComments: 20,
							postsLiked: [],
						});
					}

					return true;
				} catch (error) {
					console.log("Error checking if user exists: ", error.message);
					return false;
				}
			},
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			async authorize(credentials) {
				await connectToDB();
				try {
					const user = await User.findOne({ email: credentials.email });
					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							credentials.password,
							user.password
						);
						if (isPasswordCorrect) {
							return Promise.resolve(user); // Return the user object with empty credentials
						} else {
							return Promise.reject(new Error("סיסמה לא נכונה"));
						}
					} else {
						return Promise.reject(new Error("לא נימצא משתמש נא הרשם"));
					}
				} catch (error) {
					console.log(error);
				}
			},
		}),
	],

	callbacks: {
		async session({ session }) {
			// store the user id from MongoDB to session

			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();

			return session;
		},
	},
});

export { handler as GET, handler as POST };
