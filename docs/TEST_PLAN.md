# Test Plan: Conduit (RealWorld) Automation Framework

| Metadata                    | Value                              |
| :-------------------------- | :--------------------------------- |
| **Document Version**        | 1.0.0                              |
| **Author**                  | QA / SDET Lead                     |
| **System Under Test (SUT)** | Conduit (RealWorld) Web & REST API |
| **Framework Stack**         | Playwright + TypeScript + Zod      |
| **Status**                  | Active / Baselined                 |
| **Date**                    | 2026-08-30                         |

# QA/SDET Test Plan: Conduit (RealWorld) Automation Framework

| Metadata              | Value                                            |
| :-------------------- | :----------------------------------------------- |
| **Document version**  | 1.0.0                                            |
| **System under test** | Conduit (RealWorld) web application and REST API |
| **Test owner**        | QA/SDET                                          |
| **Framework**         | Playwright, TypeScript, Zod                      |
| **Status**            | Draft baseline                                   |

## 1. Purpose

This test plan defines the test scope, test basis, test strategy, test design techniques, execution suites, and quality gates for the Conduit automation framework.

The plan is written as a QA/SDET engineering baseline. It defines what is tested and how coverage is organized; individual test case steps and Playwright implementation details belong in the test code and related test documentation.

## 2. Test Basis and References

In a conventional delivery project, the test plan would be based on approved product requirements, a Software Requirements Specification (SRS), acceptance criteria, API contracts, and UI specifications.

This project does not provide a separate project-specific PRD or SRS. The following sources therefore form the test basis:

| Test basis                                                                                                   | Use in this plan                                                                     |
| :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| [RealWorld API OpenAPI specification](https://api.realworld.show/openapi.json)                               | Endpoint, request, response, authentication, parameter, and status-code expectations |
| [API Redoc documentation](https://api.realworld.show/redoc)                                                  | Human-readable API contract reference                                                |
| [Official API specification and Hurl tests](https://github.com/realworld-apps/realworld/tree/main/specs/api) | API behavior and executable contract examples                                        |
| [Frontend routing specification](https://docs.realworld.show/specifications/frontend/routing/)               | UI routes and navigation expectations                                                |
| [Frontend API specification](https://docs.realworld.show/specifications/frontend/api/)                       | UI-to-API interaction expectations                                                   |
| [Official E2E specifications](https://github.com/realworld-apps/realworld/tree/main/specs/e2e)               | User-facing behavior and E2E coverage reference                                      |
| [Hosted Conduit application](https://demo.realworld.show/)                                                   | Observable UI behavior and environment validation                                    |
| Project delivery requirements                                                                                | Framework, phase, and implementation expectations                                    |

The official specifications define the product baseline. This repository translates that baseline into a Playwright-based QA/SDET test implementation.

## 3. System Under Test and Environment

Conduit is a web application with a frontend SPA and a REST API backend.

| Component         | Environment                         |
| :---------------- | :---------------------------------- |
| Web UI            | `https://demo.realworld.show/`      |
| REST API          | `https://api.realworld.show/api/`   |
| API configuration | `API_BASE_URL` environment variable |
| UI configuration  | `UI_BASE_URL` environment variable  |
| Browsers          | Chromium, Firefox, WebKit           |

The hosted system is a public demo environment. The test team does not control its deployment, database, rate limits, seed data, or network conditions. A failure caused by an external environment condition must be distinguished from a confirmed product defect.

## 4. Test Objectives

### 4.1 Functional testing: In scope

Functional testing validates whether the application delivers the behavior defined by the test basis. Current feature areas include:

- User registration, login, and logout
- Current user and profile updates
- Article creation, retrieval, update, deletion, and favorites
- Personal feed and article listing
- Comments creation, retrieval, and deletion
- Profile retrieval and follow/unfollow behavior
- Tags retrieval
- Protected-route and invalid-credential behavior

### 4.2 Non-functional testing: Partially in scope

Compatibility and deployment validation are included in the current phase. The following non-functional areas are deferred:

- Visual regression testing
- Performance and load testing
- Full security testing
- Database testing

Basic authentication and authorization checks remain part of functional and negative testing. They do not constitute a full security assessment.

## 5. Test Levels and Technical Areas

The following areas describe where and how the system is evaluated. They are complementary, not mutually exclusive.

| Area                        | Scope and application                                                                                                                  |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **API testing**             | Direct validation of REST endpoints, status codes, payloads, authentication, and business behavior using Playwright API requests       |
| **UI/E2E testing**          | Validation of critical user journeys through the browser using Page Objects and user-facing locators                                   |
| **Integration testing**     | Validation of interactions between the UI, API, and backend behavior                                                                   |
| **Contract/schema testing** | Runtime validation of API response structures using OpenAPI expectations and Zod schemas                                               |
| **Compatibility testing**   | Execution of UI coverage against Chromium, Firefox, and WebKit                                                                         |
| **Deployment testing**      | Validation that the configured CI environment can install dependencies, browsers, compile the project, and execute the intended suites |

## 6. Test Design Techniques and Approaches

The test suite will apply the following techniques where they provide meaningful risk coverage:

| Technique                    | Application                                                                                                                                          |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Negative testing**         | Invalid credentials, empty required fields, invalid tokens, unauthorized operations, and invalid resource requests                                   |
| **Boundary testing**         | Empty values, minimum/maximum meaningful values, pagination limits, and input length boundaries                                                      |
| **Equivalence partitioning** | Valid, invalid, empty, and unregistered input classes such as email and password values                                                              |
| **Decision table testing**   | Combinations of authentication state, resource ownership, request validity, and article/favorite state                                               |
| **Exploratory testing**      | Investigation of behavior not fully represented by repeatable automated scenarios; valuable findings may become future test or automation candidates |

Edge cases are not maintained as a separate category. They are covered through the techniques above when relevant.

## 7. Test Execution Suites

### 7.1 Smoke suite

The smoke suite is a small set of critical tests used to determine whether the environment and core application flows are suitable for further testing. It includes essential authentication, API availability, article, and primary UI checks.

Target: 100% pass for a build to proceed.

### 7.2 Sanity testing

Sanity testing is focused validation after a specific change or fix. It targets the affected functionality and is selected as needed; it does not require a permanently separate suite.

### 7.3 Regression suite

The regression suite contains the broader automated coverage used to identify unintended changes across existing functionality. It includes API, UI, contract, negative, boundary, and cross-browser coverage as applicable.

## 8. Test Data Provisioning

Test data will be provisioned through API helpers and Playwright fixtures where this reduces unnecessary UI setup. Generated users, articles, and comments should use unique identifiers to reduce collisions in the shared demo environment.

Tests should avoid depending on mutable shared data unless the dependency is intentional and documented. Fixed public demo data, such as known profiles or articles, is environment-dependent and should be treated as a maintenance risk.

Because this is a public hosted environment, cleanup cannot always be guaranteed. The test design should therefore minimize persistent data and avoid destructive actions against data not created by the test.

## 9. Test Pyramid and Shift-Left Strategy

The framework follows the test pyramid: fast API and contract checks provide broad coverage, while a smaller set of UI/E2E tests validates critical user journeys.

Shift-left practices are applied through early feedback from TypeScript compilation, linting, schema validation, API tests, and CI execution before broader browser regression runs.

## 10. Coverage and Risk-Based Testing

Coverage is evaluated against:

- Requirements and official specifications
- Feature areas and API endpoints
- Test levels
- Critical user journeys
- Positive and negative conditions
- Boundary and decision combinations
- Browser projects

In a conventional team, Product/Business Analysis, QA/SDET, and Engineering agree on coverage based on business and technical risk. For this project, the coverage baseline is QA/SDET-led and derived from the official RealWorld specifications, the hosted application, and the project requirements.

Coverage provides evidence-based confidence in tested behavior. It does not prove that the system contains no undiscovered defects. Residual risk must be considered when interpreting test results and release readiness.

## 11. CI/CD and Quality Gates

GitHub Actions is used to provide repeatable feedback on pull requests and changes to the main branches. The pipeline is expected to run:

1. Dependency installation from the lockfile
2. TypeScript type checking
3. Linting
4. Playwright browser installation
5. API smoke/regression execution
6. UI execution across configured browser projects
7. HTML report and test-result artifact publication

### Exit criteria

- Smoke tests pass at 100%.
- No open blocker or critical defect remains for release.
- TypeScript checks pass.
- Linting passes without errors; warnings are reviewed and reduced.
- Contract/schema assertions pass for covered API responses.
- Intended reports and failure evidence are available from CI.

## 12. Defect Management Approach

Defects are evaluated using severity, priority, reproducibility, affected environment, and available evidence. A defect report should include enough information to reproduce and investigate the issue, including relevant traces, screenshots, API requests/responses, or CI artifacts.

The reusable bug report template is maintained separately from this test plan.

## 13. Future Scope

The following areas are intentionally deferred from the current phase:

- **Visual regression testing:** Baseline screenshot comparison for critical UI views
- **Performance testing:** Response-time, load, stress, and scalability assessment
- **Security testing:** Dedicated security assessment, penetration testing, and security scanning beyond basic authorization checks
- **Database testing:** Direct persistence, integrity, transaction, and API-to-database validation

## 14. Review and Maintenance

This plan should be reviewed when the system scope, API contract, UI behavior, execution environment, or project phase changes. Updates should be limited to decisions that affect test scope, risk, execution, or release criteria.

---

## 11. Maintenance & Review Cadence

- **Review Frequency**: After every major feature release or sprint iteration.
- **Flaky Test Policy**: Any test that fails intermittently without code changes is quarantined with a tracked bug issue and reviewed weekly.
- **Package Updates**: Dependabot configured for automated security and Playwright version updates.
