## rCache

I created rCache as an easy-to-use personal finance application that allows users to stay on top of their spending.  It was developed with mobile phone use in mind, but the web application is available and functional at larger viewport sizes. It is [available here](https://rcachev2.netlify.app/) and is free to use.

rCache is a simple application to track variable spending from a single account. It allows users to track deposits and expenses, as well as add, edit, and delete transactions, and track transactions as they clear the user's bank account. It is built with React and Firebase and utilizes form validation and authentication to provide a secure and seamless user experience.

### Technologies Used

 - **React** & **React Router** 
 - **Firebase** - user authentication and database storage    
  - **Formik** - form validation and management
  - **Modular Sass**

### Features

**Transaction List**

The homepage displays a list of transactions, sorted by date with the most recent at the top. Users can view their balance including spending and deposits.

Users can add new transactions by clicking the "Add Entry" button or edit existing transactions by clicking on them.

**Transaction Form**

The transaction form allows users to enter a date, amount, description, note, and transaction type (deposit or spend). Form validation ensures that all required fields are filled out and that the amount entered is valid. Users can delete a transaction by clicking on the trash icon in the form. Once a transaction is submitted, it is added to the list and the balance is updated accordingly.

**User Authentication**

Users can sign up for an account or log in using their email and password. Firebase handles user authentication and stores user information in the database. Only authenticated users can access the transaction list and transaction form.
