"use-strict";

if (typeof nodemailer === "undefined") {
  var nodemailer = require("nodemailer");
}

if (typeof pug === "undefined") {
  exports.pug = require("pug");
}

if (typeof juice === "undefined") {
  exports.juice = require("juice");
}

const env = exports.env = process.env;

if (typeof mailTransport === "undefined"){
    exports.mailTransport = nodemailer.createTransport({
        host: env.SMTP_SERVER,
        port: env.SMTP_PORT,
        secure: true,
        auth: {
            user: env.SMTP_USERNAME,
            pass: env.SMTP_PASSWORD
        }
    });
}

exports.headers = {
  "Access-Control-Allow-Headers" : "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST"
};
