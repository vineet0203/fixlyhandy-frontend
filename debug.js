import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.toString()}`);
  });

  try {
    console.log('Navigating to http://localhost:5173/login...');
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
    console.log('Successfully loaded http://localhost:5173/login');
    
    // Dump some info
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`Body text snippet:\n${bodyText.substring(0, 500)}`);
  } catch (e) {
    console.error('Error during navigation:', e);
  } finally {
    await browser.close();
  }
})();
