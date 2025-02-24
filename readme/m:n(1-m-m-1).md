# Sequelize Associations and Profile Fetching

## Overview
This project demonstrates how to use Sequelize ORM to model associations between `Customer`, `Grant`, and `Profile` entities. It also explains how to fetch a user profile along with associated grants and profiles.

## Models and Associations

### Entities
- **Customer**: Represents a user or client.
- **Profile**: Represents a user profile.
- **Grant**: Acts as a join table connecting Customers and Profiles.

### Associations

1. **One-to-Many Relationships:**
   ```javascript
   db.customer.hasMany(db.grant);
   db.grant.belongsTo(db.customer);

   db.profile.hasMany(db.grant);
   db.grant.belongsTo(db.profile);
   ```
   - A customer can have many grants.
   - A profile can have many grants.
   - Each grant belongs to one customer and one profile.

2. **Many-to-Many Relationship (Shorthand):**
   ```javascript
   db.customer.belongsToMany(db.profile, { through: db.grant });
   db.profile.belongsToMany(db.customer, { through: db.grant });
   ```
   - Establishes a many-to-many relationship between Customers and Profiles via Grants.

## API Endpoint

### Get User Profile
**Endpoint:** `GET /profile/:id`

Fetches a customer by ID along with their associated grants and profiles.

#### Example Implementation
```javascript
const get_profile = async (req, res) => {
  const userProfile = await db.customer.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["created_at", "updated_at"] },
    include: [
      {
        model: db.grant,
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: db.profile,
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      },
    ],
  });

  res.json({
    data: userProfile,
  });
};
```

### Shorthand Version
With the `belongsToMany` association, the query can be simplified:

```javascript
const userProfile = await db.customer.findOne({
  where: { id: req.params.id },
  attributes: { exclude: ["created_at", "updated_at"] },
  include: [
    {
      model: db.grant,
      attributes: { exclude: ["created_at", "updated_at"] },
      include: db.profile,
    },
  ],
});
```

## Conclusion
This setup efficiently models relationships between customers and profiles, leveraging Sequelize's association capabilities. Using `belongsToMany` allows for simplified queries and better scalability in complex relationships.

## License
MIT

