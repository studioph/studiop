# studiop
My personal website, hosted using Firebase/Google Cloud. It is actually quite easy to do and I invite anyone interested in reducing the cost of having a website to take a look. I went from paying ~$100/year at Squarespace to pretty much nothing thanks to the generous free-tier quotas that Firebase and GCP have. On top of that there is also the $300 credit you get when signing up for Google Cloud.

This site is hosted on Firebase, and as such the content of the `functions` directory is intended to be utilized with Firebase Functions (Google Cloud Functions). There is currently 1 function for handling contact form submissions.

The header and footer scripts in the root of the repository are for conditional loading of Google reCAPTCHA and form submission logic, and are inserted using a WordPress plugin.
