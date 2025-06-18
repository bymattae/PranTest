const { chromium } = require('playwright');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://whop.com/login');

  // Use a fake account you've already created manually
  const email = 'YOUR_FAKE_EMAIL';
  const password = 'YOUR_PASSWORD';

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  console.log("✅ Logged in");

  await page.goto('https://whop.com/chartpapi/');
  console.log("👀 Viewing ChartPapi page...");

  const endTime = Date.now() + 60 * 60 * 1000; // 1 hour test

  while (Date.now() < endTime) {
    await page.mouse.move(200 + Math.random() * 200, 300 + Math.random() * 100);
    console.log("⌛ Still active...");
    await delay(30000); // wait 30s
  }

  console.log("✅ Done farming time.");
  await browser.close();
})();
