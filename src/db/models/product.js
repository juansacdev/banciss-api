const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
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
