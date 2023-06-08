import TopPosts from "../topPosts/TopPosts";
export default function Info() {
	return (
		<div className="  h-max w-[100%] flex flex-col">
			<div className=" self-end px-10 pt-10">
				<TopPosts />
			</div>
		</div>
	);
}
