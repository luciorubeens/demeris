import { Env } from '../support/Env';
import { Pools } from '../support/pages/pools';

describe('Pools location and availibility', function () {
  beforeEach(() => {
    cy.visit(Env.LOCAL);
  });

  it('Pool search field', function () {
    const poolsPage = new Pools();

    poolsPage.goTo();
    poolsPage.searchField().click();
    poolsPage.searchForPool('test');
  });
});
