"use-strict";

if (typeof functions === "undefined") {
  var functions = require("firebase-functions");
  var config = functions.config();
}

if (typeof nodemailer === "undefined") {
  var nodemailer = require("nodemailer");
}

if (typeof pug === "undefined") {
  var pug = require("pug");
}

if (typeof juice === "undefined") {
  var juice = require("juice");
}

if (typeof OAuth2 === "undefined"){
  const { google } = require ("googleapis");
  var OAuth2 = google.auth.OAuth2;
}

if (typeof OAuth2Client === "undefined"){
  var OAuth2Client = new OAuth2(
    config.oauth.client_id,
    config.oauth.client_secret
  );
  OAuth2Client.setCredentials({
    refresh_token: config.oauth.refresh_token
  });
}

exports.form_handler = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  console.log(`Received request body: ${req.body}`);

  const fn = pug.compileFile(config.template.path);
  const html = fn({
    ...vars,
    logo: config.logo ? config.logo.path : null,
  });

  const message = {
    from: config.address.from,
    to: config.address.to,
    replyTo: vars.email,
    subject: config.message.subject + (vars.subject.length > 0 ? `: ${vars.subject}` : ''),
    html: juice(html),
  };

  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.mail.user,
      clientId: config.oauth.client_id,
      clientSecret: config.oauth.client_secret,
      refreshToken: config.oauth.refresh_token
    }
  });

  mailTransport
    .sendMail(message)
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
