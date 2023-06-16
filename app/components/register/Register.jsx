"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Register() {
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

	return (
		<>
			<div className="  w-[50vw] h-max bg-main_gray rounded-lg pb-10 mt-20 max-lg:hidden">
				<div>
					<h3 className=" text-center text-[white] lg:text-6xl pt-10">
						נא הרשם בישביל להגיב
					</h3>
				</div>
				<div className=" flex flex-row-reverse mt-10 px-10">
					<label htmlFor="username" className="text-[white] ml-4 lg:text-2xl">
						:שם משתמש
					</label>
					<input
						className="w-[400px] rounded-lg"
						type="text"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex flex-row-reverse mt-10 px-10">
					<label htmlFor="username" className="text-[white] ml-4 text-2xl">
						: סיסמא
					</label>
					<input
						className="w-[450px] rounded-lg"
						type="password"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex flex-row-reverse mt-10 px-10">
					<label htmlFor="username" className="text-[white] ml-4 text-2xl">
						:חזור על הסיסמה
					</label>
					<input
						className="w-[355px] rounded-lg"
						type="password"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex flex-row-reverse mt-10 px-10">
					<label htmlFor="email" className="text-[white] ml-4 text-2xl">
						:אמייל
					</label>
					<input
						className="w-[464px] rounded-lg"
						type="text"
						id="email"
						name="email"
					/>
				</div>
				<div className=" flex justify-center mt-10">
					{" "}
					<button className="bg-main_orange p-2 px-10 rounded-lg text-[white] text-xl">
						הרשם
					</button>
				</div>
				<div>
					{" "}
					<p className="text-center text-[white] mt-5 text-3xl">או</p>
				</div>

				{providers &&
					Object.values(providers).map((provider) => {
						return (
							<div
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className="flex justify-center">
								<button className="flex text-[white] gap-5 justify-center mt-5">
									{" "}
									<div className="flex gap-3 bg-[white] text-[black] p-3 rounded-md">
										<p className="w-full">Google הרשמה עם</p>
										<img
											width="25"
											height="25"
											alt='Google "G" Logo'
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
										/>
									</div>
								</button>
							</div>
						);
					})}
			</div>
			<div className="lg:hidden text-center mt-10">
				<div>
					<h4 className="text-3xl text-[white]">נא הרשם בישביל להגיב</h4>
				</div>
				<div>
					<div className=" flex flex-row-reverse mt-10 ">
						<label htmlFor="username" className="text-[white] ml-4 lg:text-2xl">
							:שם משתמש
						</label>
						<input
							className=" rounded-lg w-[200px]"
							type="text"
							id="username"
							name="username"
						/>
					</div>
				</div>{" "}
				<div className=" flex flex-row-reverse mt-10 ">
					<label htmlFor="username" className="text-[white] ml-4 ">
						: סיסמא
					</label>
					<input
						className=" rounded-lg w-[234px]"
						type="password"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex flex-row-reverse mt-10 ">
					<label htmlFor="username" className="text-[white] ml-4 ">
						:חזור על הסיסמה
					</label>
					<input
						className=" w-[172px] rounded-lg"
						type="password"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex flex-row-reverse mt-10 ">
					<label htmlFor="username" className="text-[white] ml-4 ">
						:אמייל
					</label>
					<input
						className=" rounded-lg w-[245px]"
						type="password"
						id="username"
						name="username"
					/>
				</div>
				<div className=" flex justify-center mt-10">
					{" "}
					<button className="bg-main_orange p-2 px-10 rounded-lg text-[white] text-xl">
						הרשם
					</button>
				</div>
				<div className="">
					<h4 className="text-[#fff] text-3xl mt-4">או</h4>
					{providers &&
						Object.values(providers).map((provider) => {
							return (
								<div
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="flex justify-center">
									<button className="flex text-[white]  justify-center ">
										{" "}
										<div className="flex gap-3 bg-[white] text-[black] p-3 rounded-md">
											<p className="w-full">Google הרשמה עם</p>
											<img
												width="25"
												height="25"
												alt='Google "G" Logo'
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
											/>
										</div>
									</button>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
}
