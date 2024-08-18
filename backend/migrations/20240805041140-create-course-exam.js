'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_exam', {
      course_exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Course',
          key: 'course_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exam',
          key: 'exam_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      week_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Week',
          key: 'week_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add the composite unique constraint
    await queryInterface.addConstraint('course_exam', {
      fields: ['exam_id', 'course_id', 'week_id'],
      type: 'unique',
      name: 'course_exam_exam_id_course_id_week_id_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint first
    await queryInterface.removeConstraint('course_exam', 'course_exam_exam_id_course_id_week_id_unique');

    // // Then drop the table
    // await queryInterface.dropTable('course_exam');
  }
};
