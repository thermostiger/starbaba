# 🚀 Supabase 数据库初始化指南

## ⚠️ 重要：必须先完成此步骤才能登录！

您的 Supabase 数据库目前是空的，需要先创建表结构。

---

## 📋 步骤 1：登录 Supabase

1. 打开浏览器访问：https://supabase.com/dashboard
2. 登录您的账号
3. 选择项目：`cppneymkpmffarnrwfst`

---

## 📝 步骤 2：执行 SQL 初始化脚本

### 方法 A：通过 Supabase Dashboard（推荐）

1. **打开 SQL Editor**
   - 在左侧菜单点击 `SQL Editor`
   - 点击 `New query` 按钮

2. **复制 SQL 脚本**
   - 打开项目文件：`supabase-init.sql`
   - 全选并复制所有内容（Cmd+A, Cmd+C）

3. **粘贴并执行**
   - 在 SQL Editor 中粘贴（Cmd+V）
   - 点击右下角 `Run` 按钮（或按 Cmd+Enter）
   - 等待执行完成（应该显示 "Success"）

4. **验证表已创建**
   - 点击左侧菜单 `Table Editor`
   - 应该看到以下表：
     * ✅ users
     * ✅ resources
     * ✅ documentaries
     * ✅ orders
     * ✅ membership_plans
     * ✅ media

### 方法 B：通过命令行（如果您安装了 psql）

```bash
# 在项目目录执行
PGPASSWORD='x2LQekd*FuUwwGw' psql \
  -h db.cppneymkpmffarnrwfst.supabase.co \
  -U postgres \
  -d postgres \
  -f supabase-init.sql
```

---

## 🔑 步骤 3：验证管理员账号

1. **检查 users 表**
   - 在 Supabase Dashboard 点击 `Table Editor`
   - 选择 `users` 表
   - 应该看到一条记录：
     * email: `admin@starbaba.com`
     * role: `admin`
     * name: `系统管理员`

2. **如果没有看到管理员账号**
   - 在 SQL Editor 中单独执行：
   ```sql
   INSERT INTO users (email, password, name, role, provider)
   VALUES (
       'admin@starbaba.com',
       '$2b$10$kHW1BSGO3vdlBulf2pSq5el6E20St5ODUtrx4rB5WlkkntifI5ALu',
       '系统管理员',
       'admin',
       'email'
   );
   ```

---

## ✅ 步骤 4：测试登录

1. **访问登录页面**
   ```
   http://localhost:3001/login
   ```

2. **输入管理员账号**
   - 邮箱：`admin@starbaba.com`
   - 密码：`admin123456`

3. **点击登录**
   - 应该成功登录并跳转到 `/admin`
   - 看到管理后台仪表盘

---

## 🐛 常见问题

### Q1: 执行 SQL 时报错 "relation already exists"
**A:** 这是正常的，说明表已经存在。可以忽略。

### Q2: 登录后仍然报错
**A:** 请检查：
1. 确认 users 表中有 admin 账号
2. 确认 .env 文件中有 `AUTH_SECRET`
3. 重启开发服务器：
   ```bash
   # 在终端按 Ctrl+C 停止
   pnpm dev
   ```

### Q3: Supabase 项目显示 "Paused"
**A:** 免费版项目会自动暂停，点击 "Restore" 唤醒即可。

### Q4: 看不到 SQL Editor
**A:** 确保您有项目的管理员权限。

---

## 📊 数据库结构说明

初始化后会创建以下表：

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| users | 用户表 | email, password, role, vipExpiresAt |
| resources | 资源表 | title, category, price, downloadLinks |
| documentaries | 纪录片表 | title, coverImage, downloadLinks |
| orders | 订单表 | userId, amount, status, paymentMethod |
| membership_plans | 会员套餐表 | name, duration, price, features |
| media | 媒体文件表 | filename, url, mimeType |

---

## 🎯 下一步

数据库初始化完成后：

1. ✅ 登录管理后台
2. ✅ 修改管理员密码（重要！）
3. ✅ 添加第一个资源
4. ✅ 测试前台功能

---

## 💡 提示

- 初始化脚本是幂等的，可以多次执行
- 管理员账号使用 `ON CONFLICT DO NOTHING`，不会重复创建
- 所有密码都使用 bcrypt 加密存储
- 默认会创建 3 个会员套餐

---

**完成以上步骤后，您就可以正常使用系统了！** 🎉
