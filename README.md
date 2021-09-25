# studiop
My personal website, hosted using AWS Amplify. It is actually quite easy to do and I invite anyone interested in reducing the cost of having a website to take a look. I went from paying ~$100/year at Squarespace to pretty much nothing thanks to the AWS pay-as-you-go model which for a small, low traffic site such as my own, results in substantial cost savings.

There is currently 1 function for handling contact form submissions, which is a Lambda function.

The header and footer scripts in the root of the repository are for conditional loading of Google reCAPTCHA and form submission logic, and are inserted using a WordPress plugin.
