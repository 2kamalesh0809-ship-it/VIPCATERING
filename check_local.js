import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });

    try {
        console.log('Navigating to local site...');

        // Homepage
        await page.goto('http://localhost:5173/');
        await page.waitForTimeout(6000); // Wait for intro animation
        await page.screenshot({ path: 'homepage.png' });
        console.log('Homepage screenshot saved.');

        // Blog Page
        await page.goto('http://localhost:5173/blog');
        await page.waitForTimeout(6000);
        await page.screenshot({ path: 'blogpage.png' });
        console.log('BlogPage screenshot saved.');

        // Events List
        await page.goto('http://localhost:5173/events');
        await page.waitForTimeout(6000);
        await page.screenshot({ path: 'events_list.png' });
        console.log('Events List screenshot saved.');

        // Biriyani Detail
        const biriyaniLink = await page.locator('text=/Biriyani|Biryani/i').first();
        if (await biriyaniLink.isVisible()) {
            await biriyaniLink.click();
            await page.waitForTimeout(6000);
            await page.screenshot({ path: 'biriyani_detail.png' });
            console.log('Biriyani Detail screenshot saved.');
        } else {
            console.log('Biriyani link not found, trying direct navigation');
            await page.goto('http://localhost:5173/events/kalyana-biriyani');
            await page.waitForTimeout(6000);
            await page.screenshot({ path: 'biriyani_detail.png' });
        }

    } catch (error) {
        console.error('Error during screenshots:', error);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
