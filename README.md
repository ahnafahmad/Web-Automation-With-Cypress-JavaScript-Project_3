# Web-Automation-With-Cypress-JavaScript-Project_3

### This project automates the [Saucedemo](https://www.saucedemo.com/) website workflows using Cypress with JavaScript.The automation covers the complete flow from login to checkout, verifying sorting functionality, cart operations, and logout.

## Tool & Technology used in this Project
 - Language: JavaScript
 - Tool: Cypress
 - IDE: Visual Studio Code (VS Code)

## Framework used in this Project
 - Cypress Framework

 ## Project Scenarios
  - The User can log in successfully.
  - The User can sort products by Name (any order).
  - The User can sort products by Price (any order).
  - The user can add three products to the cart.
  - The user can remove the second product from the cart.
  - The user can proceed with checkout and complete it successfully.
  - The User can log out and confirm that the session ended.

  ## How to run this project:
 - Clone this project [Saucedemo-Web-Application-Automation-With-JavaScript-Cypress-Framwork](https://github.com/ahnafahmad/Web-Automation-With-Cypress-JavaScript-Project_3.git)
 - hit the following command:
  ```
 npx Cypress open\*
 ```

 ## Prerequisite
 You have to install all these packages to run this Project<br>
 ```
node js
 ```
 ```
npm install
```

## Framework Structure

- <b>Elements Folder</b> – Stores all the locators.
- <b>Data Files Folder</b> – Stores all the test data .
- <b>Utils</b> – Reusable helper functions.
- <b>Support (commands.js)</b> – Custom Cypress commands.

## Reasoning for Choosing this Design
- <b>Centralized locators and data</b> – Any change in selectors or test data requires updating only one file
- <b>Custom Commands & Utility Functions</b> – Improve reusability and reduce duplication.
- <b>Data-driven approach</b> – Product selection and user credentials can be updated easily without modifying tests.


