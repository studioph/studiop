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

if (typeof mailTransport === "undefined") {
  var mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.gmail.email,
      pass: config.gmail.password
    },
  });
}

exports.form_handler = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  const vars = JSON.parse(req.body);
  console.log(vars);
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
