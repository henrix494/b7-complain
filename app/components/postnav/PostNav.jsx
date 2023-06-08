"use client";
import { useState } from "react";
import Select from "react-select";

export default function PostNav(props) {
	const options = [
		{ value: "הכל", label: "הכל" },
		{ value: "תנועה", label: "תנועה" },
		{ value: "החזקה", label: "החזקה" },
		{ value: "מחירים", label: "מחירים" },
		{ value: "מזג האוויר", label: "מזג האוויר" },
		{ value: "אלימות", label: "אלימות" },
		{ value: "התרדה", label: "התרדה" },
		{ value: "כללי", label: "כללי" },
	];
	const [values, setValue] = useState("");
	const onChangeV = (value) => {
		setValue(value.value);
		props.getFilter(value);
	};
	return (
		<div className="flex justify-center mt-10 text-right items-center text-[white] ">
			<div className=" w-[80vw] border-2 rounded-lg  p-5 flex flex-row-reverse items-center">
				<p>:חפש לפי נושא</p>
				<Select
					onChange={onChangeV}
					className=" text-[black] w-[200px] mr-3"
					options={options}
				/>
			</div>
		</div>
	);
}
