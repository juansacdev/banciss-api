const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "https://i.imgur.com/2ds4WjY.png",
		},
		cash: {
			type: Number,
			default: 0,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
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
