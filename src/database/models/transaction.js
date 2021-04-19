const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		versionKey: false,
		timestamps: {
			createdAt: "realizada",
			updatedAt: false,
		},
	},
);

module.exports = model("Transaction", TransactionSchema);
