import "./main.css";
import Formc from "./Formc";
export default function Main() {
	return (
		<div className="  relative bg-[url('/b7.jpg')]  h-[60vh] bg-no-repeat bg-center bg-cover pt-20 ">
			<div className="px-[4vw] ">
				<div>
					<h1 className=" text-[#d68b4f] max-lg:text-center max-lg:text-3xl  lg:text-9xl font-extrabold">
						באר שבע תלונות
					</h1>
				</div>
				<div>
					{" "}
					<h2 className=" mt-5 text-2xl max-lg:text-center max-lg:text-3xl text-[#38b431] font-bold">
						ברוכים הבאים לאתר התלונות של באר שבע
					</h2>
				</div>
				<div className=" absolute bottom-[37%]    max-lg:right-1/2  max-lg:translate-x-[50%] lg:left-[28rem] z-20">
					<div className="wrapper max-lg:right-1/2 max-lg:translate-x-[38%]  ">
						<div className=" flex justify-center rounded-lg w-[350px] h-[125px] bg-main_orange absolute top-[110px] max-lg:right-1/2 max-lg:translate-x-[48.7%] lg:translate-x-[-14.3%] ">
							<button className="text-[white] text-2xl bg-main_orange p-2 rounded-lg h-[50px] absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-100%]">
								פרסם כאן
							</button>
						</div>
					</div>
					<div className=" h-[500px] text-[white]  w-[350px] bg-main_orange absolute top-[100px] max-lg:right-1/2 max-lg:translate-x-[50%] lg:right-[-40px]  rounded-lg">
						<Formc />
					</div>
				</div>
			</div>
		</div>
	);
}
