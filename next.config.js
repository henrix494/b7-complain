/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { appDir: true },
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
	async headers() {
		return [
			{
				source: "/api/posts",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store max-age=0",
					},
				],
			},
			{
				source: "/api/post/new",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store max-age=0",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
