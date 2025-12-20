// ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'starbaba', // 项目名称，PM2列表中显示的名字
            script: 'pnpm',
            args: 'start', // 调用 package.json 中的 start 脚本
            env: {
                NODE_ENV: 'production',
                PORT: 3000 // 你可以修改端口
            },
        },
    ],
};