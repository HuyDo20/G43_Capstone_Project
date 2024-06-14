"use strict";
module.exports = (sequelize, DataTypes) => {
	const AccountWeek = sequelize.define(
		"AccountWeek",
		{
			account_day_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			account_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			day_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "day",
					key: "day_id",
				},
			},
			day_process: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "accountweek",
			timestamps: false,
		},
	);

	// Alphabet.associate = function (models) {
	// 	Alphabet.hasMany(models.User, { foreignKey: "StatusId", as: "users" });
	// };

	return AccountWeek;
};
