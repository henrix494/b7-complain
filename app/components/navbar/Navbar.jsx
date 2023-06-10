"use client";
import "./navbar.css";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
export default function Navbar() {
	const { data: session } = useSession();
	const [userData, setUserData] = useState([]);
	const value = useAppSelector((state) => {
		return state.subStatereducer.value.isSub;
	});
	const [hamToggler, setHamToggler] = useState(false);
	const onClickHam = () => {
		setHamToggler((prev) => !prev);
	};
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
	const myLoader = ({ src }) => {
		return `${session?.user.image}`;
	};

	return (
		// Desktop
		<>
			<nav className="bg-main_gray text-[white] h-[70px] lg:flex  fixed z-40 w-full hidden  ">
				<div className="flex h-[100&] items-center px-10 justify-between w-[100%] ">
					<div>
						<Link href={"/"}>
							<h1 className="text-4xl">באר שבע</h1>
						</Link>
					</div>
					<div>
						<p>{value}</p>
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
										<span>{userData.numberOfComments}</span> :מספר התגובות
										שנישארו
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
			{/* Moblie */}
			<nav className="bg-main_gray text-[white] h-[70px] lg:hidden  fixed z-40 w-full  ">
				<div
					className={`w-[80vw] h-[100vh] absolute bg-main_gray transition-[180s] duration-1000 ease-in-out   ${
						hamToggler ? " right-0 ani" : "right-[-80%] anti"
					}`}>
					<p onClick={onClickHam} className=" absolute right-0 p-10 text-3xl ">
						X
					</p>

					<div className="flex flex-col justify-center items-center h-full gap-8  pb-10 ">
						<div>
							<Image
								alt="profile-img "
								loader={myLoader}
								src={session?.user.image}
								width={"60"}
								height={"60"}
								className=" rounded-full"
							/>
						</div>
						<div className=" text-center">
							<p className="text-xl font-bold"> ברוכים הבאים</p>
							<p className="text-2xl pt-2 font-serif"> {session?.user.name} </p>
						</div>
						<div>
							{" "}
							<h4 className=" text-lg">
								{" "}
								<span>{userData.numberOfPosts}</span> :מספר הפוסטים שנישארו
							</h4>
						</div>
						<div>
							<h4 className="text-lg">
								{" "}
								<span>{userData.numberOfComments}</span> :מספר התגובות שנישארו
							</h4>
						</div>
						<div className="border-t-2 border-t-main_orange w-full self-center flex justify-center pt-10">
							<button
								className="  bg-main_orange p-2 rounded-lg"
								onClick={signOut}>
								יציאה
							</button>
						</div>
					</div>
				</div>

				<div className="flex h-full items-center px-10 justify-between w-[100%]  ">
					<div className=" ">
						<Link href={"/"}>
							<h1 className="text-2xl">באר שבע</h1>
						</Link>
					</div>

					<div className="flex gap-10 text-lg items-center ">
						{session?.user ? (
							<div className="flex items-center gap-5 ">
								<div>
									<button
										className="  bg-main_orange p-2 rounded-lg"
										onClick={signOut}>
										יציאה
									</button>
								</div>
								<div onClick={onClickHam}>
									<svg
										stroke="#FFA629"
										fill="#FFA629"
										stroke-width="0"
										viewBox="0 0 512 512"
										height="2em"
										width="2em"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
									</svg>
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
		</>
	);
}
