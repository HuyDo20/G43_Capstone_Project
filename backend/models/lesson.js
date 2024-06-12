"use strict";
module.exports = (sequelize, DataTypes) => {

	const Lesson = sequelize.define(
		"Lesson",

		{
			lesson_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			day_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "day",
					key: "day_id",
				},
			},
			lesson_description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lesson_type_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "quiztype",
					key: "quiz_type_id",
				},
			},
			lesson_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "lesson",
			timestamps: false,
		},
	);


	return Lesson;

};
