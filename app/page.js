import Main from "./components/main/Main";
import Info from "./components/infoForm/Info";
import Feed from "./components/feed/Feed";
import Script from "next/script";
export default function Home() {
	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive">{`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.GA_TRACKING_ID}')`}</Script>
			<Main />
			<Info />

			<Feed />
		</>
	);
}
