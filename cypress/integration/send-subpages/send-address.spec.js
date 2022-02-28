import { Navbar } from '../../support/pages/navbar';
import { SendToAddressSubpage } from '../../support/pages/send-subpages/send-address';
import { WelcomePage } from '../../support/pages/welcome-page';

describe('Check availability of send/address subpage elements', function () {
  const recipientAddress = 'cosmos1ws4ae7ysl496j4e4pkg0yazpkf6nyrak3ptwpt';

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);

    let welcomePage = new WelcomePage();

    welcomePage.connectKeplrButton().click();
    welcomePage.betaAgreeButton().click();
  });

  it('fill in form Recipient form', function () {
    let navbar = new Navbar();
    let sendToAddresseSubpage = new SendToAddressSubpage();

    cy.url().should('eq', Cypress.config().baseUrl);

    navbar.send().click();
    sendToAddresseSubpage.goTo();

    sendToAddresseSubpage.recipientHeader().should('be.visible');
    sendToAddresseSubpage.toARecipientAddressTextField().type(recipientAddress);
    sendToAddresseSubpage.referenceMemoInput().type('test memo');

    sendToAddresseSubpage.checkbox().should('not.be.checked');
    sendToAddresseSubpage.continueButton().should('be.disabled');

    sendToAddresseSubpage.checkbox().check();

    sendToAddresseSubpage.continueButton().should('not.be.disabled');
  });

  it('fill in form Amount form with Slow fee', function () {
    let sendToAddresseSubpage = new SendToAddressSubpage();

    recipientFormGoThrough();

    sendToAddresseSubpage.amountHeader().should('be.visible');
    sendToAddresseSubpage.continueButton().should('be.disabled');
    sendToAddresseSubpage.inputAmountOfAssets().type('0.1');
    sendToAddresseSubpage.continueButton().should('not.be.disabled');
    sendToAddresseSubpage.selectSlowTransactionFee();
    sendToAddresseSubpage.continueButton().click();
  });

  it('check Review form', function () {
    recipientFormGoThrough();
    amountFormGoThrough();

    let sendToAddresseSubpage = new SendToAddressSubpage();

    sendToAddresseSubpage.reviewHeader().should('be.visible');
    sendToAddresseSubpage.confirnAndContinueButton().should('not.be.disabled');
  });

  it('transfering Atom', function () {
    recipientFormGoThrough();
    amountFormGoThrough();

    let sendToAddresseSubpage = new SendToAddressSubpage();

    sendToAddresseSubpage.confirnAndContinueButton().click();
    sendToAddresseSubpage.signTransactionPlaceholder().should('be.visible');
    // this should finish the flow with transfering atom, if cypress didnt require actions in keplr before
    // sendToAddresseSubpage.transactionSuccess().should('be.visible');
    // sendToAddresseSubpage.doneButton().click();
    cy.url().should('eq', Cypress.config().baseUrl);
  });

  function recipientFormGoThrough() {
    let navbar = new Navbar();
    let sendToAddresseSubpage = new SendToAddressSubpage();

    navbar.send().click();
    sendToAddresseSubpage.goTo();

    sendToAddresseSubpage.toARecipientAddressTextField().type(recipientAddress);
    sendToAddresseSubpage.referenceMemoInput('test memo');
    sendToAddresseSubpage.checkbox().check();
    sendToAddresseSubpage.continueButton().click();
  }

  function amountFormGoThrough() {
    let sendToAddresseSubpage = new SendToAddressSubpage();
    sendToAddresseSubpage.amountHeader().should('be.visible');
    sendToAddresseSubpage.continueButton().should('be.disabled');
    sendToAddresseSubpage.inputAmountOfAssets().type('0.1');
    sendToAddresseSubpage.continueButton().should('not.be.disabled');
    sendToAddresseSubpage.selectSlowTransactionFee();
    sendToAddresseSubpage.continueButton().click();
  }
});
