// const nodemailer = require("nodemailer");

// const emailSend = async () => {
// 	const transport = nodemailer.createTransport({
// 		host: "smtp.gmail.com",
// 		port: 465,
// 		secure: true,
// 		auth: {
// 			user: "banciss.api@gmail.com",
// 			pass: "cpvdatxuepbpfdxp",
// 		},
// 	});

// 	const msg = "Tu código de autenticación es...";
// 	const code = 1234

// 	const send = await transport.sendMail({
// 		from: '"Código de Autenticación" <banciss.api@gmail.com>',
// 		to: "banciss.api@gmail.com",
// 		subject: msg,
// 		text: msg,
// 		html: `<b>${code}</b>`,
// 	});

// 	console.log({ send });
// };


// module.exports = {
// 	emailSend,
// };

let x1 = 'J47EQMTIHAUXS635FJDSSVSJNN2TOVSEGM5HMUCMKR3CKWCNOMSA'
let x2 = 'J47EQMTIHAUXS635FJDSSVSJNN2TOVSEGM5HMUCMKR3CKWCNOMSA'

console.log(x1 === x2)