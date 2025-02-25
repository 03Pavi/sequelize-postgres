# Sequelize Associations: Creating Records with Related Data

## Overview

This guide explains how to create a record in one table and simultaneously insert related data into another table using Sequelize associations.

## Prerequisites

- Sequelize installed and configured.
- A database connection established.
- Models defined with proper associations.

## Models Setup

### User Model (`testUser`)
```js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TestUser extends Model {}

TestUser.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, { sequelize, modelName: 'testUser' });

module.exports = TestUser;
```

### Test Model (`test`)
```js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Test extends Model {}

Test.init({
  code: DataTypes.STRING,
  userId: DataTypes.INTEGER,
}, { sequelize, modelName: 'test' });

module.exports = Test;
```

### Defining Associations
```js
const TestUser = require('./TestUser');
const Test = require('./Test');

TestUser.hasOne(Test, { as: 'user_test', foreignKey: 'userId' });
Test.belongsTo(TestUser, { foreignKey: 'userId' });
```

## Creating Records with Associations

To create a `TestUser` and insert related data into the `Test` table, use the following code:

```js
const user = await db.testUser.create(
  {
    name: "Pavitar",
    email: "1@gmail.com",
    user_test: {
      code: "1234",
      userId: 1,
    },
  },
  {
    include: {
      model: db.test,
      as: "user_test",
    },
  }
);
```

### Explanation

- **`db.testUser.create({...})`**: Creates a new `TestUser` record.
- **`user_test: {...}`**: Contains the data for the associated `Test` table.
- **`include` option**:
  - **`model: db.test`**: Specifies the associated model.
  - **`as: "user_test"`**: Matches the alias used in the association (`hasOne`).

Sequelize uses the defined association to insert the related `Test` record and link it to the `TestUser` using the foreign key `userId`.

## Important Notes

1. **Ensure Associations Are Defined Correctly**: The `as` key in the `include` must match the alias used in the association.
2. **Foreign Key Handling**: Sequelize will automatically set the `userId` in the `Test` record to match the created `TestUser`'s ID.
3. **Error Handling**: Wrap your code in `try-catch` blocks to handle validation or database errors.

## Example with Error Handling

```js
try {
  const user = await db.testUser.create(
    {
      name: "Pavitar",
      email: "1@gmail.com",
      user_test: {
        code: "1234",
      },
    },
    {
      include: {
        model: db.test,
        as: "user_test",
      },
    }
  );
  console.log("User created:", user);
} catch (error) {
  console.error("Error creating user:", error);
}
```

## Conclusion

Using Sequelize associations with the `include` option allows you to create records across multiple tables in a single query, maintaining relational integrity and simplifying your codebase.

