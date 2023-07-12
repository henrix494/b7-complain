import mongoose from "mongoose";

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	try {
		await mongoose.connect(
			"mongodb+srv://natan494:NffxgLcopC$!M&5Q@cluster0.r8sjpai.mongodb.net/",
			{
				dbName: "b7_complain",
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
connectToDB();
