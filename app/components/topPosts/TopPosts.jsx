import React from "react";
import Image from "next/image";
export default function topPosts() {
	return (
		<div className=" w-[60vw] h-[500px] border-2 bg-[#fff] rounded-lg ">
			<div>
				<div>
					<h3 className="text-center pt-10 text-4xl">
						! ברוכים הבאים לאתר תלונות באר שבע
					</h3>
				</div>
				<div className="mt-5">
					<p className=" text-center text-xl px-4">
						אתר זה מיועד לאזרחי באר שבע על מנת לאפשר להם להביע את תלונותיהם
						באופן אנונימי. כאן תוכלו לחלוק את הבעיות, הנושאים והתלונות שלכם
						בקלות ובביטחה. אנו מבינים כי ישנם רבים מכם שמעוניינים לשמור על
						פרטיותם ועדיפים לא לחשוף את הזהות שלהם כאשר מדברים על נושאים רגישים
						או תלונות.
					</p>
				</div>
				<div>
					<h4 className="text-center mt-7 text-4xl font-bold">
						! האתר אנונימי לחלוטין
					</h4>
				</div>
				<div className="pt-5">
					<h2 className=" text-right px-4 text-4xl font-bold">
						? למה אני צריך להירשם{" "}
					</h2>
					<h3 className="text-right px-4 pt-5 text-2xl">
						ההרשמה נועדה בישביל לימנוע ספאם ובוטים
					</h3>
				</div>
			</div>
		</div>
	);
}
