var express = require('express');
var router = express.Router();
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");
const now = new Date();
const kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));
const weekday = kst.getUTCDay();

router.get('/', async (req, res, next) => {
  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

  try {
    await driver.get('http://dankook.sen.hs.kr/index.do');
    const menuElement = await driver.findElement(By.xpath('//*[@id="section_11"]/div/div/div[2]/a'));
    const menu = await menuElement.getText();
    const imageElement = await driver.findElement(By.xpath('//*[@id="index_board_mlsv_031_347547"]/div/div[1]/p[2]/img'));
    const image = await imageElement.getAttribute('src');
    res.send({ menu: menu, image: image });
  } catch (error) {
    if (error.name == "NoSuchElementError") {
      res.send({ menu: "주말 및 공휴일에는 급식 정보가 존재하지 않습니다.", image: "https://dankook.sen.hs.kr/design/template/template032/images/main_school_menu_thumbnail.jpg"}) 
    }
    else {
      res.send({ menu: `에러가 발생하였습니다. - ${error}`, image: "https://dankook.sen.hs.kr/design/template/template032/images/main_school_menu_thumbnail.jpg"})
    };
  } finally {
    driver.quit();
  }
});

module.exports = router;
