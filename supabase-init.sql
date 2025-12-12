-- Starbaba Database Schema for Supabase
-- 请在 Supabase SQL Editor 中执行此文件

-- 1. Users 表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    provider VARCHAR(50) DEFAULT 'email',
    "vipExpiresAt" TIMESTAMP,
    "purchasedResources" JSONB DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 2. Resources 表
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    stage VARCHAR(100),
    price DECIMAL(10, 2) DEFAULT 0,
    "vipPrice" DECIMAL(10, 2) DEFAULT 0,
    duration VARCHAR(100),
    "isEnglishAudio" BOOLEAN DEFAULT FALSE,
    "isHot" BOOLEAN DEFAULT FALSE,
    content TEXT,
    "coverImage" VARCHAR(500),
    "downloadLinks" JSONB DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 3. Documentaries 表
CREATE TABLE IF NOT EXISTS documentaries (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    "coverImage" VARCHAR(500),
    duration VARCHAR(100),
    "isHot" BOOLEAN DEFAULT FALSE,
    content TEXT,
    "downloadLinks" JSONB DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 4. Orders 表
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    type VARCHAR(50),
    "resourceId" INTEGER,
    "membershipPlanId" INTEGER,
    amount DECIMAL(10, 2),
    "paymentMethod" VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    "transactionId" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 5. Membership Plans 表
CREATE TABLE IF NOT EXISTS membership_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration INTEGER,
    price DECIMAL(10, 2),
    features JSONB DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 6. Media 表
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(500),
    "mimeType" VARCHAR(100),
    filesize INTEGER,
    width INTEGER,
    height INTEGER,
    url VARCHAR(1000),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_stage ON resources(stage);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders("userId");
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- 插入管理员账号
-- 密码: admin123456 (bcrypt hash)
INSERT INTO users (email, password, name, role, provider)
VALUES (
    'admin@starbaba.com',
    '$2b$10$kHW1BSGO3vdlBulf2pSq5el6E20St5ODUtrx4rB5WlkkntifI5ALu',
    '系统管理员',
    'admin',
    'email'
) ON CONFLICT (email) DO NOTHING;

-- 插入示例会员套餐
INSERT INTO membership_plans (name, duration, price, features)
VALUES 
    ('月度会员', 30, 29.9, '["全站资源免费下载", "专属客服", "优先更新"]'::jsonb),
    ('季度会员', 90, 79.9, '["全站资源免费下载", "专属客服", "优先更新", "赠送精选资源"]'::jsonb),
    ('年度会员', 365, 199.9, '["全站资源免费下载", "专属客服", "优先更新", "赠送精选资源", "终身优惠"]'::jsonb)
ON CONFLICT DO NOTHING;
