import puppeteer from 'puppeteer';

let instance = null;

/**
 * Gets a reusable puppeteer instance
 *
 * @returns
 */
async function getBrowserInstance() {
	if (!instance) {
		instance = await puppeteer.launch({
			headless: true,
			args: [
				// Disable cors checks
				'--disable-web-security',
				// Required for Docker version of Puppeteer
				'--no-sandbox',
				'--disable-setuid-sandbox',
				// This will write shared memory files into /tmp instead of /dev/shm,
				// because Docker’s default for /dev/shm is 64MB
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--no-first-run',
				'--no-zygote',
				'--single-process', // <- this one doesn't works in Windows
				'--disable-gpu',
			],
		});
	}

	return instance;
}

export async function toPdf(
	html: string,
	options: any = null,
): Promise<Buffer> {
	// we are using headless mode
	// this will reuse single browser

	const browser = await getBrowserInstance();

	const page = await browser.newPage();

	// We set the page content as the generated html by eta

	await page.setContent(html, {
		waitUntil: ['load', 'networkidle0'],
	});

	// this to determine the document width and height

	if (!options) {
		const [height, width] = await Promise.all([
			page.evaluate(() => document.documentElement.offsetHeight),
			page.evaluate(() => document.documentElement.offsetWidth),
		]);
		options = {
			printBackground: true,
			width: `${width + 1} px`,
			height: `${height + 1} px`,
		};
	}

	// we Use pdf function to generate the pdf as buffer

	const pdf = await page.pdf(options);

	await page.close();

	return pdf;
}
