
# HorizonTravel — Android Mobile QA Automation

[![HorizonTravel Mobile QA](https://github.com/exal-rom/HorizonTravelMobileQA/actions/workflows/mobile-tests.yml/badge.svg)](https://github.com/exal-rom/HorizonTravelMobileQA/actions/workflows/mobile-tests.yml)

**Appium 3 · WebdriverIO v9 · JavaScript · UiAutomator2 · Mocha · GitHub Actions**

A mobile test automation framework developed from scratch to demonstrate hands-on Android automation, maintainable test architecture, application integration, and continuous integration.

The framework automates the HorizonTravel native Android application, which communicates with a Spring Boot REST API backed by PostgreSQL.

The project is designed around a central quality engineering principle:

> Automation should provide reliable, reproducible evidence about product quality, rather than simply execute scripts.

## Project Overview

HorizonTravel is a multi-repository engineering project consisting of:

| Repository | Responsibility |
|---|---|
| [HorizonTravelMobileQA](https://github.com/exal-rom/HorizonTravelMobileQA) | Appium automation framework and CI pipeline |
| [HorizonTravelAndroid](https://github.com/exal-rom/HorizonTravelAndroid) | Native Android application |
| [HorizonTravelBackend](https://github.com/exal-rom/HorizonTravelBackend) | Spring Boot backend and PostgreSQL integration |

The Mobile QA repository is the primary entry point for reviewing the test automation implementation.

## Technical Stack

| Area | Technology |
|---|---|
| Mobile automation | Appium 3 |
| Test runner | WebdriverIO v9 |
| Programming language | JavaScript |
| Android driver | UiAutomator2 |
| Test framework | Mocha |
| Test design | Page Object Model |
| Android application | Java |
| Android build | Gradle |
| Backend | Spring Boot |
| Database | PostgreSQL 17 |
| CI/CD | GitHub Actions |
| Local device | Samsung Galaxy Tab S7 |
| CI target | Android emulator |

## System Architecture

The automated tests interact with the native Android application through Appium and UiAutomator2.

The application communicates with the Spring Boot backend through REST APIs, while PostgreSQL provides persistent storage.

```text
                WebdriverIO + Mocha
                        |
                  Test Scenarios
                        |
                   Page Objects
                        |
                     Appium
                        |
                   UiAutomator2
                        |
               Native Android App
                        |
                    REST API
                        |
                Spring Boot Backend
                        |
                   PostgreSQL
```

This architecture allows mobile tests to exercise application behaviour across the UI and backend integration layers.

## Automation Framework Design

The framework uses the Page Object Model to separate test scenarios from reusable UI interaction logic.

### Test specifications

Test specifications define the actions to perform and the expected application behaviour.

They are responsible for expressing test intent and evaluating outcomes.

### Page objects

Page objects encapsulate Android screen elements and interactions.

This reduces duplication and makes the framework easier to maintain when application screens change.

### WebdriverIO configuration

The `wdio.conf.js` file defines:

- Android automation capabilities
- Appium integration
- Mocha test execution
- Test specification discovery
- Device selection based on the execution environment

### Local and CI device selection

The framework supports different device configurations without requiring separate WebdriverIO configuration files.

For local execution, it targets a physical Samsung Galaxy Tab S7.

For CI execution, setting `CI=true` selects an Android emulator configuration.

## Local Execution

### Prerequisites

- Node.js and npm
- Java Development Kit
- Android SDK and ADB
- Appium 3
- Appium UiAutomator2 driver
- A connected Android device or configured emulator
- HorizonTravel Android application installed
- Running Spring Boot backend and PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/exal-rom/HorizonTravelMobileQA.git
cd HorizonTravelMobileQA
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Appium

```bash
npm install --global appium@3
appium driver install uiautomator2
```

Verify the installation:

```bash
appium --version
appium driver list --installed
```

### 4. Verify Android connectivity

```bash
adb devices
```

Ensure that the Android device is connected and authorised for debugging.

The local WebdriverIO configuration currently targets the Samsung Galaxy Tab S7. When using another physical device, update the corresponding device capabilities.

### 5. Execute the automated tests

```bash
npm test
```

This invokes:

```bash
wdio run ./wdio.conf.js
```

WebdriverIO starts the configured Appium service and executes the available test specifications.

## Continuous Integration

The repository contains a GitHub Actions workflow:

`.github/workflows/mobile-tests.yml`

The workflow is designed to build and test the HorizonTravel application using an automatically provisioned environment.

### CI execution sequence

```text
GitHub Actions
      |
      v
Checkout three repositories
      |
      v
Start PostgreSQL service
      |
      v
Configure Java and Node.js
      |
      v
Build Spring Boot backend
      |
      v
Start backend with test profile
      |
      v
Verify backend readiness
      |
      v
Build Android debug APK
      |
      v
Verify APK artifact
      |
      v
Install Appium and UiAutomator2
      |
      v
Start Android emulator
      |
      v
Install HorizonTravel APK
      |
      v
Execute WebdriverIO tests
```

### Backend configuration for Android emulators

An Android emulator cannot access the host machine's loopback interface using `127.0.0.1`.

Instead, Android emulators provide the special address `10.0.2.2` for accessing the host's loopback interface.

The CI pipeline therefore builds the Android application using:

```bash
./gradlew :app:assembleDebug \
  -PbackendUrl=http://10.0.2.2:58080/api/
```

This makes the backend URL configurable at build time and avoids introducing environment-specific addresses directly into the application source code.

### Database configuration

The pipeline provisions PostgreSQL 17 as a GitHub Actions service.

The Spring Boot backend is started using its test profile, with database credentials supplied through GitHub Actions secrets.

The database password is not committed to the repository.

### CI execution status

**Status: Operational — end-to-end Android automation successfully executed in GitHub Actions.**

The GitHub Actions workflow provisions and integrates three separate repositories into a repeatable mobile testing environment.

The pipeline successfully performs:

- Repository checkout and environment configuration
- Java 25 and Node.js environment setup
- PostgreSQL 17 database provisioning
- Spring Boot backend build and startup
- Backend readiness verification
- Android APK compilation using Gradle
- Android emulator provisioning with KVM hardware acceleration
- Android APK installation
- Appium 3 and UiAutomator2 initialization
- WebdriverIO and Mocha automated test execution
- Application login and Tour Guides navigation verification

**Verified execution results:**

- CI execution #3: Successful
- CI execution #4: Successful
- Automated test coverage: 1 end-to-end scenario
- Latest verified result: 1 passed, 0 failed

The automated scenario verifies that a tourist can authenticate successfully, reach the application's home screen, and navigate to the Tour Guides section.

The initial CI integration issues involving Android emulator hardware acceleration and WebdriverIO worker initialization have been resolved.

[View workflow executions](https://github.com/exal-rom/HorizonTravelMobileQA/actions)

## Quality Engineering Principles

This project demonstrates several principles that guide my approach to software quality engineering.

### Risk-based automation

Automation should prioritise meaningful application behaviours and areas where regression failures could have significant consequences.

The value of an automated test is determined by the confidence and feedback it provides, not simply by its existence.

### Reproducibility

Automated testing requires controlled environments, known dependencies, consistent configuration, and interpretable results.

The CI workflow is designed to provision the application, backend, database, and mobile execution environment through a repeatable process.

### Separation of responsibilities

Test scenarios, UI interactions, execution configuration, application logic, and infrastructure are separated to improve maintainability.

### Meaningful assertions

A successful technical operation does not necessarily mean that the intended business outcome has occurred.

Test design should distinguish between technical success and correct functional behaviour.

### Quality as a shared responsibility

Quality engineering extends beyond defect detection.

It includes defining quality gates, improving delivery processes, identifying risks, and helping engineering teams establish consistent, repeatable practices.

## Current Status and Roadmap

### Implemented

- Appium 3 and WebdriverIO mobile automation framework
- JavaScript and Mocha test execution
- Page Object Model structure
- Local Android execution on a Samsung Galaxy Tab S7
- Environment-specific Android device configuration
- Integration with separate Android and backend repositories
- Operational GitHub Actions CI pipeline
- PostgreSQL 17 service provisioning
- Spring Boot backend build and startup verification
- Automated Android APK compilation and installation
- Android emulator execution with KVM hardware acceleration
- Configurable backend URL for Android CI builds
- Successful end-to-end tourist login and Tour Guides navigation test
- Two consecutive successful GitHub Actions workflow executions

### In progress

- Expanding automated regression coverage
- Adding negative authentication and input validation scenarios
- Extending Tour Guides functional verification
- Improving test reporting and execution diagnostics
- Publishing test execution evidence and CI artifacts
- Strengthening automated quality gates and regression feedback

## Related Repositories

**[HorizonTravelAndroid](https://github.com/exal-rom/HorizonTravelAndroid)**

Native Android application under test.

**[HorizonTravelBackend](https://github.com/exal-rom/HorizonTravelBackend)**

Spring Boot REST API and PostgreSQL persistence layer.

## Author

**Rafael Ordonez**

QA Lead | QA Manager | Quality Engineering

Software quality engineering professional with more than 15 years of experience in test strategy, automation, quality processes, delivery assurance, and technical team leadership.

This project demonstrates hands-on mobile automation development alongside experience designing and improving quality engineering practices.
