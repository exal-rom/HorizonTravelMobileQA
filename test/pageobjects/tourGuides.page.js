class TourGuidesPage {

    get tourGuidesMenu() {
        return $('android=new UiSelector().text("Tour Guides")');
    }

    get guideHiresTab() {
        return $('android=new UiSelector().text("Guide Hires")');
    }

    async openTourGuides() {
        await this.tourGuidesMenu.click();
    }
}

module.exports = new TourGuidesPage();