"use client";
import Card from "../UI/Card";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSub } from "../../../redux/features/subSlice";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import PostNav from "../postnav/PostNav";
export default function Feed() {
	const dispatch = useDispatch();
	const value = useAppSelector((state) => {
		return state.subStatereducer.value.isSub;
	});
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const [com, setCom] = useState("");
	const [filter, setFilter] = useState("");
	const [userDate, setUserData] = useState();
	const [showComments, setShowComments] = useState(false);
	const [error, setError] = useState(false);
	const onShowhandler = () => {
		setShowComments((prev) => {
			return !prev;
		});
	};
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts");
			const data = await response.json();
			setPosts(data);
		};
		fetchPosts();
		const interval = setInterval(() => {
			const fetchPosts = async () => {
				const response = await fetch("/api/posts");
				const data = await response.json();
				setPosts(data);
			};
			fetchPosts();
		}, 7000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	useEffect(() => {
		if (session?.user) {
			const fetchLeftPosts = async () => {
				const userLeft = await fetch(`/api/info/${session?.user.id}`, {
					next: { revalidate: 5 },
				});
				const userLeftData = await userLeft.json();
				setUserData(userLeftData.numberOfComments);
			};
			fetchLeftPosts();
		}
	}, [session]);
	useEffect(() => {
		if (session?.user) {
			const fetchLeftPosts = async () => {
				const userLeft = await fetch(`/api/info/${session?.user.id}`);
				const userLeftData = await userLeft.json();
				setUserData(userLeftData.numberOfComments);
			};
			fetchLeftPosts();
		}
	}, [value]);

	const getFilter = (filterFromChild) => {
		setFilter(filterFromChild.value);
	};
	const postss = posts.filter((post) => {
		return post.tag.includes(filter);
	});

	const postComment = async (e, id) => {
		e.preventDefault();

		if (session?.user) {
			if (!com) {
				setError(true);
				return;
			}
			if (userDate > 0) {
				try {
					setError(false);
					setCom("");
					dispatch(changeSub(false));

					const response = await fetch(`/api/comments/${id}`, {
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						method: "PUT",
						body: JSON.stringify({
							comments: com,
						}),
					});

					const updateCount = await fetch(
						`/api/upDateComments/${session?.user.id}`,
						{
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							method: "PATCH",
						}
					);

					dispatch(changeSub(true));
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			alert("נא הרשם או התחבר");
		}
	};
	return (
		<div className="flex flex-col flex-wrap mt-[50px] gap-5 justify-center items-center">
			<PostNav getFilter={getFilter} />
			{filter === "הכל"
				? posts.map((post) => {
						return (
							<Card key={post._id}>
								<div className=" border-b-2 border-[#0000003c] w-full">
									<h3 className="p-5 text-3xl font-bold">
										נוצר על ידי:
										<span className=" font-light">
											{" " + post.nickname}
										</span>{" "}
									</h3>
									<div>
										<h3 className="pr-5 pb-3 text-3xl font-bold">
											{" "}
											נושא:{" "}
											<span className=" font-light">{" " + post.tag}</span>{" "}
										</h3>
									</div>
								</div>
								<div className="p-5">
									<article className="text-2xl">{post.post}</article>
								</div>
								<div className=" border-t-2 border-[#0000003c] flex justify-around pt-5">
									<div>
										<p>{`(${post.likes}) `}:לייקים</p>{" "}
									</div>
									{/* To do */}
									<div>
										<div>
											<p
												className="text-[#3c59ff] cursor-pointer"
												onClick={onShowhandler}>
												הצג תגובות<span>({post.comments.length})</span>
											</p>
											<div className={showComments ? "block" : " hidden"}>
												{post.comments.map((com, index) => {
													return (
														<div
															key={index}
															className=" border-2 border-[#00000035]  mt-2 w-[200px] p-3 rounded-md">
															<p>{com}</p>
														</div>
													);
												})}
											</div>
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
												className={` border-2 w-full placeholder:text-right p-3 text-right mt-5 ${
													error ? " border-[red]" : " border-[black]"
												}`}
												placeholder="כתוב תגובה"></textarea>
										</div>
										<button className=" bg-main_gray px-3 py-2 rounded-lg text-[white] ml-3 mt-5 float-left">
											פרסם תגובה
										</button>
									</form>
								</div>
							</Card>
						);
				  })
				: postss.map((post) => {
						return (
							<Card key={post._id}>
								<div className=" border-b-2 border-[#0000003c] w-full">
									<h3 className="p-5 text-3xl font-bold">
										נוצר על ידי:
										<span className=" font-light">
											{" " + post.nickname}
										</span>{" "}
									</h3>
									<div>
										<h3 className="pr-5 pb-3 text-3xl font-bold">
											{" "}
											נושא:{" "}
											<span className=" font-light">{" " + post.tag}</span>{" "}
										</h3>
									</div>
								</div>
								<div className="p-5">
									<article className="text-2xl">{post.post}</article>
								</div>
								<div className=" border-t-2 border-[#0000003c] flex justify-around pt-5">
									<div>
										<p>{`(${post.likes}) `}:לייקים</p>{" "}
									</div>
									<div>
										<p
											className="text-[#3c59ff] cursor-pointer"
											onClick={onShowhandler}>
											הצג תגובות<span>({post.comments.length})</span>
										</p>
										<div className={showComments ? "block" : " hidden"}>
											{post.comments.map((com, index) => {
												return (
													<div
														key={index}
														className=" border-2 border-[#00000035]  mt-2 w-[200px] p-3 rounded-md">
														<p>{com}</p>
													</div>
												);
											})}
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
												className={` border-2 w-full placeholder:text-right p-3 text-right mt-5 ${
													error ? " border-[red]" : " border-[black]"
												}`}
												placeholder="כתוב תגובה"></textarea>
										</div>
										<button className=" bg-main_gray px-3 py-2 rounded-lg text-[white] ml-3 mt-5 float-left">
											פרסם תגובה
										</button>
									</form>
								</div>
							</Card>
						);
				  })}
			{postss.length < 1 && filter !== "הכל" && (
				<p className="h-[500px] text-3xl text-[red]">לא נמצא פוסט</p>
			)}

			{}
		</div>
	);
}
