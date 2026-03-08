export default (sequelize, DataTypes) => {
  const Comparison = sequelize.define(
    "Comparison",
    {
      comparisonKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imdbIds: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      titles: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      movieCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comparedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "comparisons",
      timestamps: false,
    },
  );

  return Comparison;
};
