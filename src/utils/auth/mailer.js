const nodemailer = require("nodemailer");
const { passwordEmail } = require('../../config')

const emailSend = async ({ code, userEmail }) => {
	const transport = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "banciss.api@gmail.com",
			pass: passwordEmail,
		},
	});

	const send = await transport.sendMail({
		from: '"Banciss Bank" <banciss.api@gmail.com>',
		to: userEmail,
		subject: "Código de autenticación",
		html: `
        <p>Este es tu código de verificacion. Por favor ingresa este código para poder ingresar a tu perfil bancario. 🙂</p>
        <big><big><b>${code}</b></big></big>
        `,
	});

	return send;
};

module.exports = {
	emailSend,
};
