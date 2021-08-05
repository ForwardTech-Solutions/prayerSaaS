Cypress.Commands.add('clickGoogleReCAPTCHA', () => {
    // Wait until the iframe (Google reCAPTCHA) is totally loaded
    cy.wait(500);
    cy.get('[title="reCAPTCHA"]')
        .first()
        .then((recaptchaIframe) => {
            console.log('recaptchaIframe: ', recaptchaIframe);
            const body = recaptchaIframe.contents()
            console.log('body: ', body);
            cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
        })
  });