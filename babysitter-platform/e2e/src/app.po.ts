import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  login(email, password) {
    browser.get('/home/login');
    element(by.name('email')).sendKeys(email);
    element(by.name('password')).sendKeys(password);
    element(by.id('btnLogin')).click();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
