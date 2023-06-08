/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		GOOGLE_ID:
			"45383237502-cda5h7jd6s8203floo3dab2bmhvplm0e.apps.googleusercontent.com",
		GOOGLE_SECRET: "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",
		MONGODB_URI:
			"mongodb+srv://natan494:NffxgLcopC$!M&5Q@cluster0.r8sjpai.mongodb.net/?retryWrites=true&w=majority",

		NEXTAUTH_URL: "http://localhost:3000",
		NEXTAUTH_URL_INTERNAL: "http://localhost:3000",
		NEXTAUTH_SECRET:
			"sadjovnasoihcjn98123hcoinjviwejfc9812jdoinfv98uw3g912jdasincx9812",
	},
	experimental: { appDir: true },
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
	async headers() {
		return [
			{
				source: "/api/post/new",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store",
					},
				],
			},
			{
				source: "/api/post",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
