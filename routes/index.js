var express = require('express');
var router = express.Router();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");

/* GET home page. */
router.get('/', async (req, res, next) => {

  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

  try {
      await driver.get('http://dankook.sen.hs.kr/index.do');
      await driver.wait(until.elementLocated(By.xpath('//*[@id="section_11"]/div/div/div[2]/a')), 10000);
      const menuElement = await driver.findElement(By.xpath('//*[@id="section_11"]/div/div/div[2]/a'));
      const menu = await menuElement.getText();
      const imageElement = await driver.findElement(By.xpath('//*[@id="index_board_mlsv_031_347547"]/div/div[1]/p[2]/img'));
      const image = await imageElement.getAttribute('src');
      res.send({ menu: menu, image: image });
  } catch (error) {
      res.send(error);
  } finally {
      driver.quit();
  }
});

module.exports = router;
