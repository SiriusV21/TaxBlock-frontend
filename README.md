# TaxBlock Assignment

## Features

- User can Login / Register himself on the platform.
- User can view the application for loan applied by himself.
- User can apply for new loan.

## Tech

Technologies/libraries used:

- [ReactJS](https://reactjs.org/) - For frontend.
- [ExpressJS](https://expressjs.com/) - For Backend.
- [MongoDB](https://www.mongodb.com/) - Used as Database.
- [Mongoose](https://mongoosejs.com/) - connnect backend with remote database instance.
- [node.js](https://nodejs.org/en/) - Javascript Runtime.
- [antd](https://ant.design/) - frontend UI components.
- [JWT](https://github.com/auth0/node-jsonwebtoken#readme) - JSON WEB TOKEN for token authentication.
- [Redux](https://redux.js.org/) - For handling state in the app.
- [React-Router-Dom](https://reactrouter.com/) - For Routing between pages.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - For Encrypting Passwords.
- [cors](https://github.com/expressjs/cors#readme) - For enabling data sharing between frontend and backend hosted on different servers.

## App go through

- User land on the login page, if a valid token is saved locally then the user is redirected to dashboard else he'll have to login through the credentials.
- After login a token will be saved locally for future authentication.
- On dashboard the user can see a list of his loan application alongwith there status[Pending/Approved].
- There are two buttons on the dashboard, one is to apply for a new loan and secong to log out from the app.
- For applying for a new loan the user will see a from where he need to enter the details for loan application.
- Some validation is applied for both form submition on both frontend and backend.
- The minimum amount of loan is for Rs 10,000 and the minimum time period to payback the loan is 1 years.
- The Monthly Installments can't be less than 1/10th of the loan amount.
- The starting date of the loan should be later than today's date.
- Furthermore while applying for the loan, authentication is done at backend again for security reasons.
- on clicking the logout button, the user will be logged out of the app and the locally store token will be destroyed.
- Furthermore there is some add features for Admin user, he/she can either approve or reject a loan application.
