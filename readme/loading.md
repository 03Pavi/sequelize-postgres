
---

### 📁 **Sequelize Eager Loading & Lazy Loading**

This guide explains the concepts of **Eager Loading** and **Lazy Loading** in **Sequelize** and how to implement them using practical examples.

---

### 🚀 **Table of Contents**

- [⚡ Eager Loading](#-eager-loading)  
  - [What is Eager Loading?](#what-is-eager-loading)  
  - [Example: Eager Loading Contacts](#example-eager-loading-contacts)  
- [🐢 Lazy Loading](#-lazy-loading)  
  - [What is Lazy Loading?](#what-is-lazy-loading)  
  - [Example: Lazy Loading Contacts](#example-lazy-loading-contacts)  
- [💡 Which One to Use?](#-which-one-to-use)  
- [📄 License](#-license)  

---

### Associations

```bash

db.user.hasMany(db.contact, { foreignKey: "user_id", as: "contacts" });
db.contact.belongsTo(db.user, { foreignKey: "user_id", as: "user_details" });

```


### ⚡ **Eager Loading**

#### **What is Eager Loading?**  
Eager loading fetches the associated data **immediately** with the primary query using the `include` option. This reduces the number of queries but may retrieve more data than needed.

#### **Example: Eager Loading Contacts**  

Fetch a user **along with** their contacts in a single query:



```javascript
const eager_loading_contacts = async (req, res) => {
  try {
    const data = await User.findOne({
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
      include: [
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

##### **What’s Happening?**  
- Fetches a **User** and **associated Contact(s)** in a **single query** using JOIN.  
- Excludes unnecessary fields from both `User` and `Contact`.  

##### **Result:**  
```json
{
  "data": {
    "id": 1,
    "username": "JohnDoe",
    "contact": {
      "phone": "123-456-7890",
      "email": "john@example.com"
    }
  }
}
```

---

### 🐢 **Lazy Loading**

#### **What is Lazy Loading?**  
Lazy loading fetches associated data **on-demand** via separate queries when explicitly requested.

#### **Example: Lazy Loading Contacts**  

Fetch a user first, then load their contacts **only when needed**:

```javascript
const lazy_loading_contacts = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: 1 },
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
    });

    const userContact = await user.getContacts(); // Fetch contacts on demand

    res.json({ data: user, contacts: userContact });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
```

##### **What’s Happening?**  
- First query: Fetches the **User**.  
- Second query: Fetches **Contacts** only when `getContacts()` is called.  

##### **Result:**  
```json
{
  "data": {
    "id": 1,
    "username": "JohnDoe"
  },
  "contacts": [
    {
      "phone": "123-456-7890",
      "email": "john@example.com"
    }
  ]
}
```

---

### 💡 **Which One to Use?**

| Strategy        | Pros                                      | Cons                                 |
|-----------------|-------------------------------------------|--------------------------------------|
| ⚡ **Eager Loading** | ✅ Fewer queries<br>✅ Avoids N+1 problem | ❌ Fetches extra data<br>❌ Heavy queries |
| 🐢 **Lazy Loading**  | ✅ Fetch only when needed<br>✅ Simpler queries | ❌ More DB calls<br>❌ N+1 query problem   |

- Use **Eager Loading** when you need related data upfront (e.g., listing users with their contacts).  
- Use **Lazy Loading** when related data is optional or conditionally loaded (e.g., expanding user details on click).

---

### 📄 **License**

This project is licensed under the [MIT License](LICENSE).

---
