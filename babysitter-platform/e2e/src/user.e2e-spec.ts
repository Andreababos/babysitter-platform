import { browser, element, by, $$ } from "protractor";
import { AppPage } from "./app.po";

describe('testing the sitters page', () =>{
    let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('Add a new sitter to sitters array', () => {
        page.login(); 
        var sitterNumber;
        var updatedSitterNumber
        $$('.example-card').then(function(elemsAfter){
            sitterNumber = elemsAfter.length
            browser.sleep(3000)
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
        browser.sleep(3000)
        page.login(); 
        browser.sleep(3000)
        $$('.example-card').then(function(elemsAfter){
            updatedSitterNumber = elemsAfter.length
            browser.sleep(3000)
            expect(updatedSitterNumber).toEqual(sitterNumber+1);
        })
    });

    // it('2.0: Should update a users name', () => {
    //     page.login(); 
    //     //get the name
    //     var initialValue = $$('mat-card-title').first();
    //     browser.sleep(3000)
    //     //go to the edit sitter page
    //     $$('#profileMenuButton').click();
    //     //clear the input box
    //     $$('#firstname').clear();
    //     //append to the name
    //     $$('#firstname').sendKeys('Hannah');
    //     //clear the input box
    //     $$('#lastname').clear();
    //     //append to the name
    //     $$('#lastname').sendKeys('Baker');
    //     browser.sleep(3000)
    //     //submit the change
    //     $$('#submitUpdateButton').click();
    //     browser.sleep(3000)
    //     //get the new name
    //     var newValue = $$('mat-card-title').first();
    //     //compare the names
    //     expect(newValue != initialValue).toBe(true);
    //     expect(newValue).toBe('Hannah Baker');
    //   });
    
    //   it('2.1: Should not have changed data, if we do not edit the input boxes ', () => {
    //     page.login();
    //     browser.sleep(3000)
    //     //get the name
    //     var initialValue = $$('mat-card-title').first();
    //     //go to the edit sitter page
    //     $$('#profileMenuButton').click();
    //     browser.sleep(3000)
    //     //submit the change
    //     $$('#submitUpdateButton').click();
    //     browser.sleep(3000)
    //     //get the new name
    //     var newValue = $$('mat-card-title').first();
    //     //compare the names
    //     expect(newValue == initialValue).toBe(true);
    //   });
})