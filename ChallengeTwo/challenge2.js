require('chromedriver');
var webdriver = require('selenium-webdriver');
const {By, until, Key} = require('selenium-webdriver');
var assert = require("chai").assert;

describe("challenge1 suite", function(){
    this.timeout(20000);
    var driver;

    before(function () {
        driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
    });

    after(function () {
        return driver.quit();
    });

    it("should open the copart website", function() {
        return driver.get("http://www.copart.com");
    });

    it("The title contains 'Auto Auction - Copart USA'", async function() {
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    it("Runs a search for exotics", async function() {
        var exotic = await driver.findElement(By.id("input-search"));
        return exotic.sendKeys("exotics" + Key.ENTER);
    });

    it("Validate Porsche is in the list of results", async function(){
        await driver.wait(until.titleContains('exotics For Auction at Copart'), 10000);
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        return assert.include(html, "Porsche");
    })
});