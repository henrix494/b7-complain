/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["https://lh3.googleusercontent.com/"],
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
