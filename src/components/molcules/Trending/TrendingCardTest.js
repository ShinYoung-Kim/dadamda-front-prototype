import { mockContents } from "../../../mocks/board.js";

function isImageExist(image) {
	return image !== undefined && image !== null && image !== "";
}

function foundImagesInContentsOriginal(contents) {
	if (!contents) {
		return [];
	}

	const result = Object.values(JSON.parse(contents)).map((content) => {
		return content.map((item) => {
			return item.thumbnailUrl;
		});
	});

	return result
		.flat()
		.filter((item) => isImageExist(item))
		.splice(0, 4);
}

// 개선된 코드
function foundImagesInContentsImproved(contents) {
	if (!contents) {
		return [];
	}

	const parsedContents = JSON.parse(contents);
	const foundImages = [];

	for (const content of Object.values(parsedContents)) {
		for (const item of content) {
			const thumbnailUrl = item.thumbnailUrl;
			if (isImageExist(thumbnailUrl)) {
				foundImages.push(thumbnailUrl);
				if (foundImages.length >= 4) {
					return foundImages;
				}
			}
		}
	}

	return foundImages;
}

function foundImagesInContentsImproved2(contents) {
	if (!contents) {
		return [];
	}

	const parsedContents = JSON.parse(contents);
	const foundImages = [];
	const maxImages = 4; // 최대 이미지 개수 상수화

	// 라벨을 이용하여 외부 루프를 중지할 수 있도록 함
	outerLoop: for (const content of Object.values(parsedContents)) {
		for (const item of content) {
			const thumbnailUrl = item.thumbnailUrl;
			if (isImageExist(thumbnailUrl)) {
				foundImages.push(thumbnailUrl);
				if (foundImages.length >= maxImages) {
					break outerLoop; // 최대 이미지 개수에 도달하면 외부 루프 종료
				}
			}
		}
	}

	return foundImages;
}

function testPerformance() {
	console.time("Original");
	for (let i = 0; i < 10000; i++) {
		foundImagesInContentsOriginal(mockContents);
	}
	console.timeEnd("Original");

	console.time("Improved");
	for (let i = 0; i < 10000; i++) {
		foundImagesInContentsImproved(mockContents);
	}
	console.timeEnd("Improved");

	console.time("Improved2");
	for (let i = 0; i < 10000; i++) {
		foundImagesInContentsImproved2(mockContents);
	}
	console.timeEnd("Improved2");
}

testPerformance();
