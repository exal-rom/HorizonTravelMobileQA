class LoginPage {
    get signInButton() {
        return $('id=com.example.horizontravel:id/btnToolbarSignIn');
    }

    get emailField() {
        return $('id=com.example.horizontravel:id/etEmail');
    }

    get passwordField() {
        return $('id=com.example.horizontravel:id/etPassword');
    }

    get loginButton() {
        return $('id=com.example.horizontravel:id/btnLogin');
    }

    get welcomeText() {
        return $('android=new UiSelector().textContains("Endless journeys")');
    }

    async login(email, password) {
        await this.signInButton.click();
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();