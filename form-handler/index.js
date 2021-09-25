"use-strict";

const { pug, juice, env, mailTransport, headers } = require("./cache");

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log(`Received contact form data: ${data}`);

  try {
    await mailTransport.verify();
  } catch (err) {
    console.error(`SMTP transport configuration error: ${err}`);
  }
  
  const fn = pug.compileFile(env.TEMPLATE);
  const html = fn({
    ...event,
    logo: env.LOGO ? env.LOGO : null,
  });

  const message = {
    from: env.FROM_ADDRESS,
    to: env.TO_ADDRESS,
    replyTo: data.email,
    subject: env.SUBJECT + (data.subject.length > 0 ? `: ${data.subject}` : ''),
    html: juice(html),
  };

  try {
    const result = await mailTransport.sendMail(message);
    console.log(result);
    return {
      statusCode: 200,
      headers: headers,
      body: "Message sent successfully"
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: headers,
      body: "Message failed to send"
    };
  }
};
