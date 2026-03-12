import { chromium } from 'playwright';
import path from 'path';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:5173/');
        await page.waitForTimeout(3000);
        await page.screenshot({ path: path.join(process.cwd(), 'homepage.png') });
        console.log('Homepage screenshot saved.');

        await page.goto('http://localhost:5173/blog');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(process.cwd(), 'blogpage.png') });
        console.log('BlogPage screenshot saved.');

        await page.goto('http://localhost:5173/events');
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(process.cwd(), 'events_list.png') });

        const biriyaniLink = await page.$('a:has-text("Bir")');
        if (biriyaniLink) {
            await biriyaniLink.click();
            await page.waitForTimeout(4000);
            await page.screenshot({ path: path.join(process.cwd(), 'biriyani_detail.png') });
            console.log('Biriyani Detail screenshot saved.');
        } else {
            console.log('Biriyani link not found on events page.');
        }

    } catch (error) {
        console.error('Error during screenshots:', error);
    } finally {
        await browser.close();
    }
})();
