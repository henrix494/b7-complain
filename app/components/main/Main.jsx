import "./main.css";
import Formc from "./Formc";
export default function Main() {
	return (
		<div className="  relative bg-[url('/b7.jpg')]  h-[60vh] bg-no-repeat bg-center bg-cover pt-20 ">
			<div className="px-[20vw] ">
				<div>
					<h1 className=" text-[#d68b4f]  text-9xl font-extrabold">
						באר שבע תלונות
					</h1>
				</div>
				<div>
					{" "}
					<h2 className="text-[#fff] mt-5 text-2xl">
						ברוכים הבאים לאתר התלונות של באר שבע
					</h2>
				</div>
				<div className=" absolute bottom-[20%]">
					<div className="wrapper">
						<div className=" flex justify-center w-[300px] h-[125px] bg-main_gray absolute top-[110px] ">
							<button className="text-[white] bg-main_orange p-2 rounded-lg h-[50px] absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%]">
								היתלונן כאן
							</button>
						</div>
						<div className="test"></div>
					</div>
					<div className=" h-[430px] text-[white]  w-[300px] bg-main_orange absolute top-[200px] right-[-40px] rounded-b-lg">
						<Formc />
					</div>
				</div>
			</div>
		</div>
	);
}
