
### 🔄 **Types of Transactions in Sequelize:**

1. **Managed Transactions (Auto-Commit/Rollback)**  
   Sequelize manages the commit and rollback automatically based on the success or failure of your code block.

   ```typescript
   import { sequelize } from './models';

   try {
     await sequelize.transaction(async (t) => {
       await User.create({ name: 'John' }, { transaction: t });
       await Profile.create({ userId: 1, bio: 'Hello!' }, { transaction: t });
     });
     console.log('Transaction committed successfully!');
   } catch (error) {
     console.error('Transaction rolled back!', error);
   }
   ```

2. **Unmanaged Transactions (Manual Commit/Rollback)**  
   Gives you more control over when to commit or rollback.

   ```typescript
   const t = await sequelize.transaction();

   try {
     await User.create({ name: 'John' }, { transaction: t });
     await Profile.create({ userId: 1, bio: 'Hello!' }, { transaction: t });

     await t.commit();
     console.log('Transaction committed!');
   } catch (error) {
     await t.rollback();
     console.error('Transaction rolled back!', error);
   }
   ```

---

### ⚡ **Key Options for Transactions:**
- `isolationLevel`: Control the visibility of data between transactions.
  ```typescript
  await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });
  ```
  
- `autocommit`: Boolean to enable/disable auto-commit behavior.

---
