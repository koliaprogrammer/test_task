const puppeteer = require('puppeteer');
require('dotenv').config();
try {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: process.env.EXECUTABLE_PATH
           
        });
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation();

        await page.goto('https://accounts.google.com/');
        await navigationPromise;
        await page.waitForSelector('input[type="email"]');
        await page.click('input[type="email"]');

        await navigationPromise;
        await page.type('input[type="email"]', process.env.EMAIL);

        await page.waitForSelector('#identifierNext');
        await page.click('#identifierNext');

        await page.waitForSelector('#passwordNext', {timeout: 60000});
        await page.click('input[type="email"]');

        await page.type('input[type="password"]', process.env.PASSWORD);
        await page.waitForSelector('#passwordNext');
        await page.click('#passwordNext');
        await navigationPromise;
        await page.goto('https://mail.google.com/mail/u/0/#inbox');
        const unreadEmails = await page.evaluate(() => {
            const inboxElement = document.querySelector('.bsU');
            return inboxElement ? inboxElement.textContent : '0';
        });

        console.log(`You have ${unreadEmails} unread emails.`);
    })();
} catch (e) {
    console.log(e)
}