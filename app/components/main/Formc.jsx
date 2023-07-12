"use client";
import { changeSub } from "../../../redux/features/subSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { UploadButton } from "@uploadthing/react";
import { ourFileRouter } from "../../api/uploadthing/core";
import { useEffect, useState } from "react";
export default function Formc() {
	const options = [
		{ value: "תנועה", label: "תנועה" },
		{ value: "החזקה", label: "החזקה" },
		{ value: "מחירים", label: "מחירים" },
		{ value: "מזג האוויר", label: "מזג האוויר" },
		{ value: "אלימות", label: "אלימות" },
		{ value: "התרדה", label: "התרדה" },
		{ value: "כללי", label: "כללי" },
	];

	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(null);
	const [nickName, setNickName] = useState("");
	const [tag, setTag] = useState("");
	const [post, setPost] = useState("");
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const [postsLeft, setPostsLeft] = useState();
	useEffect(() => {
		const FetchFirstPosts = async () => {
			const postsLeft = await fetch(`/api/info/${session?.user.id}`);
			const data = await postsLeft.json();
			setPostsLeft(data.numberOfPosts);
		};
		FetchFirstPosts();
	}, [session]);

	const dispatch = useDispatch();

	const createPost = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (session?.user) {
			if (!nickName || !post || !title) {
				setError("נא למלא את כל השדות");
				return;
			} else {
				if (postsLeft > 0) {
					try {
						dispatch(changeSub(false));

						setSubmitting(true);
						const timeStamp = new Date();
						const response = await fetch(`api/post/new`, {
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							method: "POST",
							body: JSON.stringify({
								userId: session.user.id,
								title: title,
								nickname: nickName,
								tag: tag,
								timeStamp: timeStamp,
								post: post,
							}),
						});
						setNickName("");
						setPost("");
						setTag("");
						setError("");
						setTitle("");

						const path = await fetch(`/api/number/${session?.user.id}`, {
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							method: "PATCH",
						});

						const getNumberOfPosts = await fetch(
							`/api/info/${session?.user.id}`
						);
						const data = await getNumberOfPosts.json();
						setPostsLeft(data.numberOfPosts);
						dispatch(changeSub(true));
					} catch (error) {
						console.log(error);
					}
				} else {
					setError("לא שניאר יותר פוסטים היום");
				}
			}
		} else {
			setError("בבקשה התחבר");
		}
	};
	const onChangeNickName = (e) => {
		setNickName(e.target.value);
	};
	const onChangeTagName = (choice) => {
		setTag(choice.value);
	};
	const onChangePost = (e) => {
		setPost(e.target.value);
	};
	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};

	return (
		<form className=" " onSubmit={createPost}>
			{" "}
			<div className="flex justify-center flex-col text-[black] px-3">
				<div className=" flex flex-col">
					<div>
						<input
							value={nickName}
							onChange={onChangeNickName}
							className="w-full placeholder:text-center rounded-md text-right pr-2"
							type="text"
							name="name"
							id="name"
							placeholder="כינוי"
						/>
					</div>
				</div>
				<div className=" w-[100%]">
					{" "}
					<p className="text-center text-[white] text-xl my-2">נושא התלונה</p>
					<Select
						onChange={onChangeTagName}
						className=" text-[black] rounded-md"
						options={options}
					/>
				</div>
				<div className="flex flex-col mt-2">
					<input
						value={title}
						onChange={onChangeTitle}
						className=" rounded-md text-right placeholder:text-center"
						type="text"
						placeholder="כותרת"
					/>
				</div>
				<div className=" relative">
					{" "}
					<textarea
						value={post}
						onChange={onChangePost}
						className=" rounded-md w-[100%] mt-5 placeholder:text-center placeholder:pt-5 placeholder:text-2xl text-right"
						name=""
						id="body"
						cols="10"
						rows="10"
						placeholder="תלונה"></textarea>{" "}
					{session?.user && (
						<div className=" absolute bottom-0 left-0 py-6 px-2">
							<span className="bg-main_gray text-[white] py-3 rounded-full px-[1rem]">
								{postsLeft}
							</span>
						</div>
					)}
				</div>
				{error && (
					<div className="text-center text-2xl text-[white] border-2 border-[red]">
						{error}
					</div>
				)}
				<div className="text-center">
					<h5 className=" text-main_gray text-lg">ניתן לפרסם 5 פוסטים ביום</h5>
				</div>

				<div className="self-center mt-2  w-[80%] bg-main_gray rounded-lg">
					<button className="  px-3 py-2  text-[white] w-[100%] text-xl">
						פרסם
					</button>
				</div>
			</div>
		</form>
	);
}
