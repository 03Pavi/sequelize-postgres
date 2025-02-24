
---

### 📁 **Sequelize Paranoid Mode (Soft Deletes)**

This guide explains how to implement **soft deletes** in Sequelize using the `paranoid` option. Soft deletes allow you to mark records as deleted without actually removing them from the database.

---

### 🚀 **Table of Contents**

- [📋 Features](#-features)  
- [⚙️ Setup](#%EF%B8%8F-setup)  
- [📖 Usage](#-usage)  
  - [Model Definition](#model-definition)  
  - [Soft Deleting a Record](#soft-deleting-a-record)  
  - [Querying Records](#querying-records)  
  - [Including Soft-Deleted Records](#including-soft-deleted-records)  
  - [Restoring Records](#restoring-records)  
- [💡 Key Points](#-key-points)  
- [📄 License](#-license)  

---

### 📋 **Features**

- ✅ Soft delete records without losing data  
- ✅ Exclude deleted records from queries by default  
- ✅ Restore soft-deleted records easily  
- ✅ Maintain data integrity  

---

### ⚙️ **Setup**

1. **Install Sequelize and Dependencies:**

```bash
npm install sequelize sequelize-cli pg pg-hstore
```

2. **Initialize Sequelize:**

```bash
npx sequelize-cli init
```

3. **Configure Database:**

Update `config/config.json` or `config/config.js` with your database credentials.

---

### 📖 **Usage**

#### 🔹 **Model Definition**

Enable `paranoid` in your model to use soft deletes:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
}, {
  paranoid: true,     // Enable soft deletes
  timestamps: true,   // Adds createdAt, updatedAt, and deletedAt
});

module.exports = User;
```

---

#### 🔹 **Soft Deleting a Record**

```javascript
const User = require('./models/User');

await User.destroy({ where: { id: 1 } });
// Soft deletes by setting deletedAt timestamp
```

---

#### 🔹 **Querying Records**

```javascript
const users = await User.findAll();
// Returns only non-deleted users
```

---

#### 🔹 **Including Soft-Deleted Records**

```javascript
const allUsers = await User.findAll({ paranoid: false });
// Returns all users, including soft-deleted ones
```

---

#### 🔹 **Restoring Records**

```javascript
await User.restore({ where: { id: 1 } });
// Restores soft-deleted user by nullifying deletedAt
```

---

### 💡 **Key Points**

- `paranoid: true` adds a `deletedAt` column.
- Soft-deleted records are excluded from queries by default.
- Use `paranoid: false` to include soft-deleted records.
- Easily restore records using `.restore()`.

---

### 📄 **License**

This project is licensed under the [MIT License](LICENSE).

---
