"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Login() {
	const [error, setError] = useState("");
	const router = useRouter();
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	useEffect(() => {
		const setProviderss = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProviderss();
	}, []);
	useEffect(() => {
		if (session?.user) {
			router.push("/");
		} else {
			return;
		}
	}, [session]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		signIn("credentials", { email, password, redirect: false }).then((what) => {
			setError(what.error);
		});
	};

	return (
		<div className="mt-[6rem] bg-main_orange w-[80vw] h-[70vh] rounded-lg">
			<div>
				<h3 className="text-7xl text-main_gray text-center">להתחבר</h3>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex  flex-col items-center justify-center  gap-5 mt-10">
				<div className=" ">
					<input
						className="w-[200px] mr-3 rounded-xl"
						id="user"
						name="user"
						type="text"
					/>
					<label className="text-3xl " htmlFor="user">
						שם משתמש
					</label>
				</div>
				<div>
					<input
						className="mr-4 rounded-xl w-[270px]"
						id="password"
						name="password"
						type="password"
					/>
					<label className="text-3xl" htmlFor="password">
						סיסמה{" "}
					</label>
					<div className=" text-[red] text-3xl">{error}</div>
				</div>

				<button className="bg-[white] px-5 py-3 rounded-xl text-lg">
					התחבר
				</button>
			</form>

			<h3 className="text-center mt-10 text-7xl">או</h3>
			{providers &&
				Object.values(providers).map((provider) => {
					return (
						<>
							{provider.id === "google" && (
								<div
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="flex justify-center">
									<button className="flex text-[white] gap-5 justify-center mt-5">
										{" "}
										<div className="flex gap-3 bg-[white] text-[black] p-3 rounded-md">
											<p className="w-full">Google התחבר עם</p>
											<img
												width="25"
												height="25"
												alt='Google "G" Logo'
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
											/>
										</div>
									</button>
								</div>
							)}
						</>
					);
				})}
		</div>
	);
}
