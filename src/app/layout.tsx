import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "세상의 모든 URL, 다담다",
	description:
		"내용에 따라 자동으로 북마크를 구성하는 신개념 컨텐츠 맞춤 스크랩 서비스, 다담다",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<head>
				<meta name="referrer" content="no-referrer" />
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
				/>
				<meta
					name="google-site-verification"
					content="WgU_59s6SZXvKL07o-aHQVJBQHkvuTgaX2wd8tjDyjY"
				/>
				<link
					rel="manifest"
					href="/manifest.webmanifest"
				/>
				<link
					rel="apple-touch-icon"
					href="/src/assets/image/dadamda-logo128.png"
				/>
				<meta
					name="apple-mobile-web-app-capable"
					content="yes"
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content="다담다"
				/>
				<meta name="theme-color" content="#155EEF" />
				<base href="/" />
			</head>
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-PC556BBB16"
			></script>
			<body>
				<div id="root"></div>
				<script
					type="module"
					src="/src/main.tsx"
				></script>
			</body>
		</html>
	);
}
