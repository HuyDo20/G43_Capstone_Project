"use strict";
module.exports = (sequelize, DataTypes) => {
	const Day = sequelize.define(
		"Day",
		{
			day_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			day_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			course_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			day_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			day_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			day_deadline: {
				type: DataTypes.DATE,
			},
		},
		{
			tableName: "day",
			timestamps: false,
		},
	);

	return Day;
};
