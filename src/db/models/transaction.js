const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
	{
		quantity: {
			type: Number,
			default: 0,
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

module.exports = model("Transaction", TransactionSchema);
