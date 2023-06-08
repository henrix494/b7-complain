import React from "react";
import Image from "next/image";
export default function topPosts() {
	return (
		<div className="  text-3xl flex gap-5 max-w-[70vw] flex-col">
			<div className="text-center text-[white] text-4xl flex justify-center gap-2">
				<Image
					src={"/flame-1.1s-200px.svg"}
					width={"50"}
					className=" bg-blend-saturation bg-[red]"
					height={"50"}
					alt="a fire imoji"></Image>
				<h2>הפוסטים החמים</h2>
			</div>

			<div className="flex gap-4">
				<div className="w-[450px] h-[410px] border-2 border-[white] rounded-2xl  text-right bg-[#cbc9c9]">
					<div className="flex justify-around  p-2 flex-col gap-3">
						<h2 className=" text-[40px] font-bold border-b-2 pb-3">
							נטלי דדון
						</h2>
						<h2>
							<h3>
								<span className=" font-semibold">נושא</span>: תחבורה
							</h3>
						</h2>
						<div>
							<p className=" overflow-hidden font-sans">
								הנהג אוטובוס היום !!! בסי חוצפתו פשוט עצר בלי להגיד כלום אני
								שברתי את שתים הרגליים שלי ולא נתנו לי פיטרון
							</p>
						</div>
						<div className=" border-t-2 border-[#00000023] flex justify-between ">
							<div>
								<h3 className=" text-[20px]"> 200K לייקים</h3>
							</div>
							<div>
								<p className=" text-[20px]"> (26)תגובות</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[450px] h-[410px] border-2 border-[white] rounded-2xl  text-right bg-[#cbc9c9]">
					<div className="flex justify-around  p-2 flex-col gap-3">
						<h2 className=" text-[40px] font-bold border-b-2 pb-3">
							נטלי דדון
						</h2>
						<h2>
							<h3>
								<span className=" font-semibold">נושא</span>: תחבורה
							</h3>
						</h2>
						<div>
							<p className=" overflow-hidden font-sans">
								הנהג אוטובוס היום !!! בסי חוצפתו פשוט עצר בלי להגיד כלום אני
								שברתי את שתים הרגליים שלי ולא נתנו לי פיטרון
							</p>
						</div>
						<div className=" border-t-2 border-[#00000023] flex justify-between ">
							<div>
								<h3 className=" text-[20px]"> 200K לייקים</h3>
							</div>
							<div>
								<p className=" text-[20px]">(26)תגובות</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[450px] h-[410px] border-2 border-[white] rounded-2xl  text-right bg-[#cbc9c9]">
					<div className="flex justify-around  p-2 flex-col gap-3">
						<h2 className=" text-[40px] font-bold border-b-2 pb-3">
							נטלי דדון
						</h2>
						<h3>
							<h2>
								<span className=" font-semibold">נושא</span>: תחבורה
							</h2>
						</h3>
						<div>
							<p className=" overflow-hidden font-sans">
								הנהג אוטובוס היום !!! בסי חוצפתו פשוט עצר בלי להגיד כלום אני
								שברתי את שתים הרגליים שלי ולא נתנו לי פיטרון
							</p>
						</div>
						<div className=" border-t-2 border-[#00000023] flex justify-between ">
							<div>
								<h3 className=" text-[20px]"> 200K לייקים</h3>
							</div>
							<div>
								<p className=" text-[20px]">תגובות(25)</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
