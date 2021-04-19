const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			require: true,
			enum: [
				"tarjeta de credito",
				"tarjeta de debito",
				"cuenta bancaria",
				"hipoteca",
				"seguros"
			],
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: {
			createdAt: true,
			updatedAt: false,
		},
	},
);

module.exports = model("Product", ProductSchema);
