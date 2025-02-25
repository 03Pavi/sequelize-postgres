
### **Types of Hooks in Sequelize**  
Hooks are triggered during various stages of the model's lifecycle. Here are some of the common ones:

#### **1. Before/After Lifecycle Hooks**  
These hooks run before or after Sequelize events like creating, updating, or deleting records.

- **Creation**  
  - `beforeValidate` / `afterValidate`  
  - `beforeCreate` / `afterCreate`  
- **Update**  
  - `beforeUpdate` / `afterUpdate`  
- **Deletion**  
  - `beforeDestroy` / `afterDestroy`  
- **Find Queries**  
  - `beforeFind` / `afterFind`  
- **Bulk Operations**  
  - `beforeBulkCreate` / `afterBulkCreate`  
  - `beforeBulkUpdate` / `afterBulkUpdate`  
  - `beforeBulkDestroy` / `afterBulkDestroy`

#### **2. Custom Hooks**  
You can also define custom hooks for specific logic.

---

### **How to Use Hooks in Sequelize**

#### **1. Defining Hooks in the Model**  
You can add hooks directly when defining a model.

```javascript
const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  hooks: {
    beforeCreate: (user, options) => {
      // Hash the password before saving
      user.password = hashPassword(user.password);
    },
    afterCreate: (user, options) => {
      console.log(`User ${user.username} created!`);
    },
  },
});
```

---

#### **2. Using `addHook` Method**  
You can also add hooks after model creation using `.addHook()`.

```javascript
User.addHook('beforeUpdate', (user, options) => {
  if (user.changed('password')) {
    user.password = hashPassword(user.password);
  }
});
```

---

#### **3. Global Hooks**  
Apply hooks across all models.

```javascript
sequelize.addHook('beforeBulkDestroy', (options) => {
  console.log('Bulk delete initiated');
});
```

---

### **Use Cases for Hooks**  
- **Data Validation:** Ensure data integrity before saving.  
- **Data Transformation:** Hash passwords before saving them to the DB.  
- **Logging:** Log changes or deletions for audit purposes.  
- **Cascading Deletes/Updates:** Manually handle related data during deletes.
