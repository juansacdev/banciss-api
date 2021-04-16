const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			match: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
		},
		lastName: {
			type: String,
			required: true,
			match: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
		},
		email: {
			type: String,
			required: true,
			match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		},
		password: {
			type: String,
			required: true,
			match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
		},
		image: String,
		cash: {
			type: Number,
			default: 0,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	},
	{
		versionKey: false,
		timestamps: {
			createdAt: true,
			updatedAt: "lastLogin",
		},
	},
);

module.exports = model("User", UserSchema);
