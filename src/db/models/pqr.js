const { Schema, model } = require("mongoose");

const PqrSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
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

module.exports = model("PQR", PqrSchema);
