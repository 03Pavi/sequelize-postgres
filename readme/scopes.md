# Sequelize Scopes Example

This project demonstrates how to use **Sequelize Scopes** to create reusable and maintainable query logic for models.

## 📋 Overview

In Sequelize, **scopes** allow you to define reusable query options that can be applied to model queries. They help keep your code **clean**, **DRY** (Don't Repeat Yourself), and more **maintainable**.

This example showcases two scopes applied to a `User` model:

1. **`isDeleted`** — Fetches soft-deleted users.
2. **`includeContact`** — Includes associated contact details for each user.

---

## 🚀 Example Usage

### Defining Scopes in the Model

Scopes can be pre-defined in the model file to keep the logic organized and reusable.

```js
// models/user.js
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Contact = require('./contact');

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    paranoid: true, // Enables soft deletes
    scopes: {
      isDeleted: {
        paranoid: false,
        where: { deleted_at: { [Sequelize.Op.ne]: null } },
      },
      includeContact: {
        include: {
          model: Contact,
          as: 'contacts',
          attributes: ['permanent_address', 'current_address'],
        },
      },
    },
  }
);

// Dynamically adding scopes
User.addScope("isDeleted", {
  paranoid: false,
  where: {
    deleted_at: {
      [Sequelize.Op.ne]: null,
    },
  },
});

User.addScope("includeContact", {
  include: {
    model: Contact,
    as: "contacts",
    attributes: ["permanent_address", "current_address"],
  },
});

module.exports = User;
```

### Applying Scopes

You can apply one or multiple scopes when querying:

```js
const User = require('./models/user');

// Apply both scopes
const users = await User.scope(['isDeleted', 'includeContact']).findAll();

// Apply a single scope
const deletedUsers = await User.scope('isDeleted').findAll();

// Bypass all scopes
const allUsers = await User.unscoped().findAll();
```

---

## ✅ Best Practices

- **Pre-define scopes** in your model files instead of adding them dynamically in route handlers.
- Use **named scopes** for frequently used queries.
- Combine scopes thoughtfully to avoid unnecessary or complex joins.
- Use `.unscoped()` when you need to bypass all scopes.

---

## ⚡️ Notes

- This example focuses solely on **Sequelize scopes** and **model querying**.
- No specific database drivers (e.g., `pg`, `mysql2`) are enforced. You can use any compatible driver with Sequelize.
- Make sure associations like `User.hasMany(Contact, { as: 'contacts' })` are properly defined.

---

Happy coding! 🚀

