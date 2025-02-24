# Customer-Profile Association with Sequelize

This guide demonstrates how to create a **many-to-many** association between **Customer** and **Profile** models using Sequelize, including handling extra fields in the through table (**Customer_Profile**).

## 📁 Project Structure

```
├── models/
│   ├── Customer.js
│   ├── Profile.js
│   └── Customer_Profile.js
├── index.js
└── README.md
```

## 📦 Sequelize Model Definitions

### 1️⃣ Customer Model (`models/Customer.js`)

```javascript
const Customer = sequelize.define('Customer', {
  name: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
});

Customer.belongsToMany(Profile, { through: 'Customer_Profile' });
```

### 2️⃣ Profile Model (`models/Profile.js`)

```javascript
const Profile = sequelize.define('Profile', {
  name: DataTypes.STRING,
});

Profile.belongsToMany(Customer, { through: 'Customer_Profile' });
```

### 3️⃣ Through Table (`models/Customer_Profile.js`)

```javascript
const Customer_Profile = sequelize.define('Customer_Profile', {
  status: DataTypes.STRING, // Extra field in the through table
});
```

## 🔗 Associations

- **Customer** ⬌ **Profile** (Many-to-Many via **Customer_Profile**)
- The **Customer_Profile** table holds extra fields like `status`.

## 🚀 Creating a Customer with Profiles

```javascript
const amidala = await Customer.create(
  {
    name: 'Pavitar Singh',
    phoneNumber: '1234566700',
    profiles: [
      {
        name: 'Developer',
        Customer_Profile: {
          status: 'active',
        },
      },
    ],
  },
  {
    include: [
      {
        model: Profile,
        through: { attributes: ['status'] },
      },
    ],
  }
);
```

## 📥 Fetching Customer with Profiles

```javascript
const result = await Customer.findOne({
  where: { name: 'Pavitar Singh' },
  include: [
    {
      model: Profile,
      through: { attributes: ['status'] },
    },
  ],
});

console.log(JSON.stringify(result, null, 2));
```

### ✅ Sample Output:

```json
{
  "id": 1,
  "name": "Pavitar Singh",
  "phoneNumber": "1234566700",
  "profiles": [
    {
      "id": 1,
      "name": "Developer",
      "Customer_Profile": {
        "status": "active"
      }
    }
  ]
}
```

## ➕ Adding a Profile to an Existing Customer

You can also associate an existing **Profile** with an existing **Customer** and include extra fields in the through table using the `addProfile` method.

```javascript
await customer.addProfile(profile, {
  through: { status: "active" },
  transaction: t, // Optional transaction support
});
```

### 🔍 Explanation:

- **`addProfile`**: Associates a **Profile** to a **Customer**.
- **`through`**: Passes extra fields (e.g., `status`) to the **Customer_Profile** table.
- **`transaction`**: (Optional) Ensures atomic operations when using Sequelize transactions.

### 💡 Example with Transaction:

```javascript
const t = await sequelize.transaction();
try {
  await customer.addProfile(profile, {
    through: { status: "active" },
    transaction: t,
  });
  await t.commit();
} catch (error) {
  await t.rollback();
  console.error("Failed to add profile with transaction:", error);
}
```

## 💡 Key Points

- **Nested Creation:** Sequelize allows creating associated models in a single call.
- **Through Table Fields:** Extra fields (like `status`) are stored in the **Customer_Profile** table.
- **Includes:** Use `include` with `through` to fetch related data and extra fields.
- **Transactions:** Use Sequelize transactions for atomic operations during associations.

## 📚 References

- [Sequelize Associations](https://sequelize.org/master/manual/assocs.html)
- [Sequelize BelongsToMany Docs](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/)
- [Sequelize Transactions](https://sequelize.org/docs/v6/other-topics/transactions/)

---

Happy Coding! 🚀

