import { test } from "@playwright/test";

const isMobile = (browserName: string) => browserName.startsWith("Mobile");

test.describe("트렌딩 페이지", () => {
	test("이달의 유저 노출하는 데 걸리는 시간 측정", async ({ page }, testInfo) => {
		if (!isMobile(testInfo.project.name)) {
			test.skip();
		}

		const start = Date.now();
		await page.goto("https://dadamda.me");
		await page.waitForSelector("text=이달의 유저");
		const end = Date.now();
		console.log("이달의 유저 노출 시간: ", end - start);
	});

	test("게시물물 노출하는 데 걸리는 시간 측정", async ({ page }) => {
		const start = Date.now();
		await page.goto("https://dadamda.me");
		await page.waitForSelector("text=님이 보드를 공유했어요.");
		const template = Date.now();
		await page.waitForSelector(
			"text=인하대 2024학년도 1학기 해외파견 국제교류학생 파견 대학 모음집 - 미국편"
		);
		const content = Date.now();

		console.log("게시물 템플릿 노출 시간: ", template - start);
		console.log("게시물 내용 노출 시간: ", content - start);
	});
});
