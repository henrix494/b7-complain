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
