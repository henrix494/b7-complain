export default function Card(props) {
	return (
		<div className="w-[30vw] h-max border-2  bg-[white] rounded-lg text-right">
			{props.children}
		</div>
	);
}
