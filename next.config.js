/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		GOOGLE_ID: process.env.GOOGLE_ID,
		GOOGLE_SECRET: process.env.GOOGLE_SECRET,
		MONGODB_URI: process.env.MONGODB_URI,
		NEXTAUTH_URL: "https://b7-complain.vercel.app/",
		NEXTAUTH_URL_INTERNAL: "https://b7-complain.vercel.app/",
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
				source: "/api/post",
				headers: [
					{
						key: "Accept",
						value: "application/json",
					},
					{
						key: "Content-Type",
						value: "application/json",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
