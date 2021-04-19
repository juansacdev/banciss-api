const Role = require("../../database/models/role");
const Product = require("../../database/models/product");

const createRoles = async () => {
	try {
		const count = await Role.estimatedDocumentCount();

		if (count) {
			return;
		}

		await Promise.all([
			new Role({ name: "user" }).save(),
			new Role({ name: "admin" }).save(),
		]);
	} catch (error) {
		console.log(error);
	}
};

const createProducts = async () => {
	try {
		const count = await Product.estimatedDocumentCount();

		if (count) {
			return;
		}

		const products = await Promise.all([
			new Product({
				name: "Banciss Clasic",
				description:
					"La tajeta de credito Banciss Clasic es perfecta para personas sin experiencia crediticia. Facil de obtener, la nejor tasa del mercado y cupo de credito competitivo.",
				type: "tarjeta de credito",
			}).save(),
			new Product({
				name: "Banciss Gold",
				description:
					"La tajeta de credito Banciss Gold esta enfocada a personas con experiencia crediticia. Facil de obtener, la nejor tasa del mercado y cupo de credito competitivo.",
				type: "tarjeta de credito",
			}).save(),
			new Product({
				name: "Banciss Platinum",
				description:
					"La tajeta de credito Banciss Platinum solo se otorga a nuestros mejores clientes",
				type: "tarjeta de credito",
			}).save(),
			new Product({
				name: "Banciss TD",
				description:
					"La tajeta de debito Banciss te permite tener tu dinero de cuuenta de ahorros a tu dispocison 24 horas al dia.",
				type: "tarjeta de debito",
			}).save(),
			new Product({
				name: "Cuenta bancaria Elit",
				description:
					"Abrir una cuenta bancaria nunca fue tan facil. En Banciss tu y la seguridad de t'u dinero es neustra prioridad.",
				type: "cuenta bancaria",
			}).save(),
			new Product({
				name: "HipoteBanciss",
				description:
					"Obtener la casa de tus sueños nunca fue tan facil. En Banciss puedes obtener el credito para tu vivienda de manera muy facil y rapida.",
				type: "hipoteca",
			}).save(),
			new Product({
				name: "Seguros Banciss",
				description: "Asegura a los que amas con nuestros seguros.",
				type: "seguros",
			}).save(),
		]);
		console.log(products)
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createRoles,
	createProducts,
};
