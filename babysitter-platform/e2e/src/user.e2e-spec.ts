import { browser, element, by, $$ } from "protractor";
import { AppPage } from "./app.po";

describe('testing the sitters page', () =>{
    let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;
  });

    it('Add a new sitter to sitters array', done => {
        page.login("parent@mail.com", "password"); 
        var sitterNumber;
        var updatedSitterNumber;
        $$('.example-card').then(function(elemsAfter){
            sitterNumber = elemsAfter.length
        })
        $$('#logoutButton').click();
        $$('#register').click();
        $$('#sitter').click();
        $$('#firstname').sendKeys('Frederik');
        $$('#lastname').sendKeys('Frederiksen');
        $$('#email').sendKeys('fred@gmail.com');
        $$('#password').sendKeys('password');
        $$('#birthdate').sendKeys('12-03-1995');
        $$('#gender').sendKeys('male');
        $$('#submitRegisterButton').click();
        browser.sleep(5000)
        page.login("parent@mail.com", "password"); 
        $$('.example-card').then(function(elemsAfter){
            updatedSitterNumber = elemsAfter.length
            browser.sleep(3000)
            expect(updatedSitterNumber).toEqual(sitterNumber+1);
            
        })
        $$('#logoutButton').click();
    });

    it('2.0: Should update a users name', done => {
        page.login("frederik@gmail.com", "password"); 
        browser.sleep(3000)
        var initialValue, newValue;
        $$('#profileMenuButton').click();
        $$('#firstname').getAttribute('value').then(function(value){
            initialValue = value;
        });
        browser.sleep(3000)
        $$('#firstname').clear();
        $$('#firstname').sendKeys('Patrik');
        $$('#submitUpdateButton').click();
        browser.sleep(3000)
        $$('#profileMenuButton').click();
        $$('#firstname').getAttribute('value').then(function(value){
            newValue = value;
            expect(newValue != initialValue).toBe(true);
            expect(newValue).toBe('Patrik');
            done()
        });
        browser.sleep(3000)
        $$('#logoutButton').click();
      });
    
      it('2.1: Should not have changed data, if we do not edit the input boxes ', done => {
        page.login("frederik@gmail.com", "password"); 
        browser.sleep(3000)
        var initialValue, newValue;
        $$('#profileMenuButton').click();
        $$('#firstname').getAttribute('value').then(function(value){
            initialValue = value;
        });
        browser.sleep(3000)
        $$('#submitUpdateButton').click();
        browser.sleep(3000)
        $$('#profileMenuButton').click();
        $$('#firstname').getAttribute('value').then(function(value){
            newValue = value;
            expect(newValue == initialValue).toBe(true);
            done()
        });
        $$('#logoutButton').click();
      });

      it('3: Should delete a user by id ', done => {
        page.login("parent@mail.com", "password"); 
        var sitterNumber, updatedSitterNumber;
        $$('.example-card').then(function(elemsAfter){
            sitterNumber = elemsAfter.length
        })
        $$('#logoutButton').click();
        page.login("frederik@gmail.com", "password"); 
        $$('#profileMenuButton').click();
        browser.sleep(1000)
        $$('#deleteButton').click();
        browser.sleep(10000)
        page.login("parent@mail.com", "password");
        $$('.example-card').then(function(elemsAfter){
            updatedSitterNumber = elemsAfter.length
            expect(sitterNumber !== updatedSitterNumber).toBe(true);
            expect(sitterNumber).toBe(updatedSitterNumber + 1);
            done()
        })
      });
})