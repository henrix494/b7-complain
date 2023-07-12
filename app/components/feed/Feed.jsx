"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Card from "../UI/Card";
import PostNav from "../postnav/PostNav";
import { changeSub } from "../../../redux/features/subSlice";
import { useAppSelector } from "@/redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Import the plugin
import "dayjs/locale/he";

export const dynamic = "force-dynamic";
export const revalidate = 5;
export const fetchCache = "force-no-store";

const Feed = () => {
	dayjs.extend(relativeTime); // Register the plugin
	dayjs.locale("he");
	const dispatch = useDispatch();
	const value = useAppSelector((state) => state.subStatereducer.value.isSub);
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const [com, setCom] = useState("");
	const [filter, setFilter] = useState("");
	const [userDate, setUserData] = useState();
	const [showComments, setShowComments] = useState(false);
	const [error, setError] = useState({});
	const [userLikeData, setUserLikeDate] = useState([]);
	const [likeClick, setLikceClick] = useState(false);
	const onShowHandler = () => {
		setShowComments((prev) => !prev);
	};
	// DATA FORAMT
	const now = new Date();

	//
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("/api/posts", { cache: "no-cache" });
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		if (session?.user) {
			const fetchLeftPosts = async () => {
				try {
					const userLeft = await fetch(`/api/info/${session.user.id}`);
					const userLeftData = await userLeft.json();

					setUserData(userLeftData.numberOfComments);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			};

			fetchLeftPosts();
		}
	}, [session]);
	useEffect(() => {
		if (session?.user) {
			const fetchLikes = async () => {
				const likeData = await fetch(`/api/info/${session?.user.id}`);
				const jsonLikeData = await likeData.json();
				setUserLikeDate(jsonLikeData.postsLiked);
			};
			fetchLikes();
		}
	}, [session]);
	useEffect(() => {
		if (session?.user) {
			const fetchLeftPosts = async () => {
				try {
					const userLeft = await fetch(`/api/info/${session.user.id}`);
					const userLeftData = await userLeft.json();
					setUserData(userLeftData.numberOfComments);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			};

			fetchLeftPosts();
		}
	}, [value]);

	const getFilter = (filterFromChild) => {
		setFilter(filterFromChild.value);
	};

	const filteredPosts = posts.filter((post) =>
		filter === "הכל" ? true : post.tag.includes(filter)
	);

	const postComment = async (e, id) => {
		e.preventDefault();

		if (!session?.user) {
			alert("נא הרשם או התחבר");
			return;
		}
		if (!com) {
			setError((prevErrors) => ({
				...prevErrors,
				[id]: true, // Set the error status for the specific post's text area
			}));
			return;
		}

		if (userDate > 0) {
			try {
				setError({});
				setCom("");
				dispatch(changeSub(false));

				await fetch(`/api/comments/${id}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "PUT",
					body: JSON.stringify({
						comments: com,
					}),
				});

				await fetch(`/api/upDateComments/${session.user.id}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "PATCH",
				});

				const response = await fetch("/api/posts", { cache: "no-cache" });
				const data = await response.json();
				setPosts(data);

				dispatch(changeSub(true));
			} catch (error) {
				console.error("Error posting comment:", error);
			}
		}
	};

	const likeAdded = async (id) => {
		setLikceClick((prev) => {
			return !prev;
		});

		const likeData = await fetch(`/api/info/${session?.user.id}`);
		const jsonLikeData = await likeData.json();
		if (jsonLikeData.postsLiked.find((data) => data === id)) {
			console.log("false");
		} else {
			await fetch(`/api/like/${id}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "PUT",
				body: JSON.stringify({
					userId: session?.user.id,
				}),
			});
			const response = await fetch("/api/posts", { cache: "no-cache" });
			const data = await response.json();
			setPosts(data);
		}
	};

	return (
		<div className="flex flex-col flex-wrap mt-[460px] gap-5 justify-center items-center max-lg:mt-[40rem] ">
			<PostNav getFilter={getFilter} />

			{filteredPosts.length === 0 && filter !== "הכל" ? (
				<p className="h-[500px] text-3xl text-[red]">לא נמצא פוסט</p>
			) : (
				filteredPosts.map((post) => (
					<Card key={post._id}>
						<div className="  pt-7 px-7">
							<div className="border-b-2 border-[#0000003c] pb-5">
								<div>
									<p>{`${post.tag} ${dayjs(post.timeStamp).fromNow()}`}</p>
								</div>
								<div>
									<h2 className="text-3xl">{post.title}</h2>
								</div>
							</div>
							<div className="flex self-end">
								<p>
									{" "}
									על ידי <span className="text-[blue]">{post.nickname}</span>
								</p>
							</div>
						</div>
						<div className="px-7 pt-2">
							<article className="text-2xl">{post.post}</article>
						</div>
						<div className=" flex justify-around pt-5">
							<div>
								<p>{`(${post.likes.length}) `}:לייקים</p>
							</div>
							<div>
								<p
									className="text-[#3c59ff] cursor-pointer"
									onClick={onShowHandler}>
									הצג תגובות<span>({post.comments.length})</span>
								</p>
								<div className={showComments ? "block" : "hidden"}>
									{post.comments.map((com, index) => (
										<div
											key={index}
											className="border-2 border-[#00000035] mt-2 w-[200px] p-3 rounded-md">
											<p>{com}</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div>
							<form action="" onSubmit={(e) => postComment(e, post._id)}>
								<div>
									<textarea
										value={com}
										onChange={(e) => setCom(e.target.value)}
										name=""
										id=""
										cols="30"
										rows="10"
										className={`border-2 w-full placeholder:text-right p-3 text-right mt-5 ${
											error[post._id] ? "border-[red]" : "border-[black]"
										}`}
										placeholder="כתוב תגובה"></textarea>
								</div>
								<div className="flex my-5 items-center justify-around">
									<div
										className=" cursor-pointer"
										onClick={() => likeAdded(post._id)}>
										<p>לייק</p>
									</div>
									<div>
										<button className="bg-main_gray px-3 py-2 rounded-lg text-[white]">
											פרסם תגובה
										</button>
									</div>
								</div>
							</form>
						</div>
					</Card>
				))
			)}
		</div>
	);
};

export default Feed;
