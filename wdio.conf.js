export const config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Samsung Galaxy Tab S7',
        'appium:udid': 'R52N80DD0NW',
        'appium:appPackage': 'com.example.horizontravel',
        'appium:appActivity': '.ui.SplashActivity'
    }],

    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        timeout: 60000
    },

    services: [
    ['appium', {
        command: 'appium'
    }]
    ]
};