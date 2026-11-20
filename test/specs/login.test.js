const LoginPage = require('../pageobjects/login.page');
const TourGuidesPage = require('../pageobjects/tourGuides.page');

describe('Tourist login and navigation', () => {

    it('should allow a tourist to log in and access Tour Guides', async () => {

        // Authenticate tourist
        await LoginPage.login(
            'tourist@horizon.demo',
            'demo1234'
        );

        // Verify successful login
        await expect(LoginPage.welcomeText).toBeDisplayed();

        // Navigate to Tour Guides
        await TourGuidesPage.openTourGuides();

        // Verify Guide Hires tab is available
        await expect(TourGuidesPage.guideHiresTab).toBeDisplayed();

    });

});