# 📖 Major Sequelize Joins Guide

This guide explains the **major SQL joins** and how to implement them using **Sequelize**.

---

## 🔗 **1. INNER JOIN**

- **Definition:** Returns only matching records from both tables.
- **Sequelize:** `required: true` (default behavior).

```javascript
const usersWithContacts = await User.findAll({
  include: [
    {
      model: Contact,
      as: 'contacts',
      required: true, // INNER JOIN
    },
  ],
});
```

✅ **Result:** Only users **with** contacts.

---

## 🔗 **2. LEFT OUTER JOIN**

- **Definition:** Returns all records from the **left** table and matched records from the **right** table. If no match, returns `NULL` for right table.
- **Sequelize:** `required: false`

```javascript
const usersWithOrWithoutContacts = await User.findAll({
  include: [
    {
      model: Contact,
      as: 'contacts',
      required: false, // LEFT OUTER JOIN
    },
  ],
});
```

✅ **Result:** All users, even those **without** contacts.

---

## 🔗 **3. RIGHT OUTER JOIN** (Workaround)

- **Definition:** Returns all records from the **right** table and matched records from the **left** table.
- **Sequelize:** Not natively supported. Use workarounds.

### ✅ **Option 1: Reverse Association**

```javascript
const contactsWithOrWithoutUsers = await Contact.findAll({
  include: [
    {
      model: User,
      as: 'user',
      required: false, // LEFT OUTER JOIN from Contact's perspective
    },
  ],
});
```

### ✅ **Option 2: Raw SQL Query**

```javascript
const [results, metadata] = await sequelize.query(`
  SELECT * FROM users
  RIGHT OUTER JOIN contacts ON users.id = contacts.user_id;
`);
```

✅ **Result:** All contacts, even those **without** users.

---

## 🔗 **4. FULL OUTER JOIN** (Raw Query)

- **Definition:** Returns all records when there is a match in either table.
- **Sequelize:** Use raw queries.

```javascript
const [results, metadata] = await sequelize.query(`
  SELECT * FROM users
  FULL OUTER JOIN contacts ON users.id = contacts.user_id;
`);
```

✅ **Result:** All users and contacts, including those without matches.

---

## 📊 **Join Types Cheat Sheet**

| Join Type           | Sequelize Option                | Description                                  |
|---------------------|----------------------------------|----------------------------------------------|
| **INNER JOIN**      | `required: true`                | Only matching records                        |
| **LEFT OUTER JOIN** | `required: false`               | All left table records + matched right ones  |
| **RIGHT OUTER JOIN**| Reverse include / Raw SQL       | All right table records + matched left ones  |
| **FULL OUTER JOIN** | Raw SQL                         | All records from both tables                 |

---
```javascript


const advance_eager_loading_contacts = async (req, res) => {

  try {
    const userId = 1;
    const data = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
      include: [
        {
          model: Subject,
          as: "subjects",
          through: "user_subject",
          through: { attributes: [] },
          required: true,
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "userId",
              "id",
              "user_subject",
            ],
          },
        },
        {
          model: Contact,
          as: "contacts",
          attributes: {
            exclude: ["created_at", "updated_at", "user_id", "id"],
          },
        },
      ],
    });
    res.json({ data });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

```



## 🚀 **Best Practices:**

1. Use **eager loading** for optimized queries.
2. For unsupported joins (**RIGHT**, **FULL**), use **raw SQL**.
3. Optimize queries by selecting only necessary attributes using `attributes`.
4. Use **conditional joins** (`where` in `include`) for filtering associated data.

