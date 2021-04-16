const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			match: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
		},
		description: {
			type: String,
			required: true,
			match: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
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
