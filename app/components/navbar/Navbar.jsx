"use client";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
export default function Navbar() {
	const { data: session } = useSession();
	const [userData, setUserData] = useState([]);
	const value = useAppSelector((state) => {
		return state.subStatereducer.value.isSub;
	});

	useEffect(() => {
		if (session?.user) {
			const fetchInfo = async () => {
				const response = await fetch(`/api/info/${session?.user.id}`);
				const data = await response.json();
				setUserData(data);
			};
			fetchInfo();
		}
	}, [session]);
	useEffect(() => {
		if (session?.user) {
			const fetchInfo = async () => {
				const response = await fetch(`/api/info/${session?.user.id}`);
				const data = await response.json();
				setUserData(data);
			};
			fetchInfo();
		}
	}, [value]);

	return (
		<nav className="bg-main_gray text-[white] h-[70px] flex  fixed z-10 w-full">
			<div className="flex h-[100&] items-center px-10 justify-between w-[100%] ">
				<div>
					<Link href={"/"}>
						<h1 className="text-4xl">באר שבע</h1>
					</Link>
				</div>
				<div>
					<p>{value}</p>
					{console.log(value)}
				</div>
				<div className="flex gap-10 text-lg items-center">
					{session?.user ? (
						<div className="flex gap-5 items-center">
							<div className="text-3xl text-[red]">
								{" "}
								<h4>
									{" "}
									<span>{userData.numberOfPosts}</span> :מספר הפוסטים שנישארו
								</h4>
							</div>
							<div className="text-3xl text-[red]">
								{" "}
								<h4>
									{" "}
									<span>{userData.numberOfComments}</span> :מספר התגובות שנישארו
								</h4>
							</div>
							<p> {session.user.name} ברוכים הבאים</p>
							<div>
								<button
									className="  bg-main_orange p-2 rounded-lg"
									onClick={signOut}>
									יציאה
								</button>
							</div>
						</div>
					) : (
						<>
							<Link href={"/login"}>
								{" "}
								<button>כניסה</button>{" "}
							</Link>
							<Link
								href={"/register"}
								className="  bg-main_orange p-2 rounded-lg">
								הרשמה
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
