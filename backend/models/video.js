"use strict";
module.exports = (sequelize, DataTypes) => {
	const Video = sequelize.define(
		"Video",
		{
			video_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			lesson_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "lesson",
					key: "lesson_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			video_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			video_link: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			video_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{
			tableName: "video",
			timestamps: false,
		},
	);
	return Video;
};
