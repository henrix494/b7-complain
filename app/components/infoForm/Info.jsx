import TopPosts from "../topPosts/TopPosts";
export default function Info() {
	return (
		<div className="  h-max w-[100%] flex flex-col max-lg:hidden absolute top-[36.5%]">
			<div className=" lg:self-end px-10 pt-10">
				<TopPosts />
			</div>
		</div>
	);
}
