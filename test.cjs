const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await context.addInitScript(() => {
        window.localStorage.setItem('access_token', 'dummy_token'); 
        window.localStorage.setItem('user', JSON.stringify({id: 1, name: 'Admin', role: 'admin'}));
    });
    const page = await context.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err));
    await page.goto('http://localhost:5174/invoices');
    await page.waitForTimeout(3000);
    await browser.close();
})();
