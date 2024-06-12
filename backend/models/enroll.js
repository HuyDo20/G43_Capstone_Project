"use strict";
module.exports = (sequelize, DataTypes) => {
	const Enroll = sequelize.define(
		"Enroll",
		{
			enroll_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			account_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			course_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			enrolled_date: {
				type: DataTypes.DATE,
			},
			deadline: {
				type: DataTypes.DATE,
			},
			enroll_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "enroll",
			timestamps: false,
		},
	);

	return Enroll;
};
