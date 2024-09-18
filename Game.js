const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function runTest() {
  let options = new chrome.Options();
  options.addArguments("--start-maximized");

  // Config Chrome
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  try {
    await driver.get("https://zzzscore.com/1to50/en/");

    await driver.executeScript("window.scrollBy(0, document.body.scrollHeight * 0.2);");

    async function clickByText(text) {
      let element = await driver.findElement(By.xpath(`//div[@id="grid"]/div[text()="${text}"]`));
      await element.click();
      // Tunggu sebentar setelah klik, jika diperlukan
      await driver.sleep(10); // Sesuaikan waktu tunggu sesuai kebutuhan
    }

    // Klik elemen dengan teks dari 1 hingga 50
    for (let i = 1; i <= 50; i++) {
      await clickByText(i.toString());
    }
  } finally {
    // Tutup
    await driver.quit();
  }
}

runTest();
