const {Builder, By, Key, until} = require('selenium-webdriver');
var assert=require('assert');

describe("Formulario de login",function(){

    it("Inicia sesion con exito",async function(){
        this.timeout(10000);
      

        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to Url
            await driver.get('http://localhost:3000/login');

            // "Introduce email,password y pulsa enter"
            await driver.findElement(By.name('email')).sendKeys('patricia@graña');
            await driver.findElement(By.name('password')).sendKeys('123456',Key.ENTER);

            let firstResult = await driver.wait(until.elementLocated(By.css('h1')), 10000);

            //console.log(await firstResult.getAttribute('textContent'));
            assert.equal("Bienvenido, patricia", await firstResult.getAttribute('textContent'));
        }
        finally{
            driver.quit();
        }

    })
})