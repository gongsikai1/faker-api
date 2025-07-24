const Koa = require('koa');
const router = require('koa-router')();
const { faker } = require('@faker-js/faker');

// 初始化Koa应用
const app = new Koa();

// 配置路由
router.get('/api/faker', async (ctx) => {
  try {
    // 从GET请求参数中获取fa的值
    const { fa } = ctx.query;
    
    // 验证参数是否存在
    if (!fa) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '缺少必要参数: fa',
        data: null
      };
      return;
    }
    
    // 使用faker.js的eval执行表达式
    // 注意：在生产环境中使用eval存在安全风险，本示例仅作演示
    let result = null
    result = eval(fa.endsWith(')') ? `faker.${fa}` : `faker.${fa}()`);
    
    // 返回成功响应
    ctx.body = {
      success: true,
      message: '请求成功',
      data: result
    };
  } catch (error) {
    // 处理错误情况
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: `执行出错: ${error.message}`,
      data: null
    };
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`示例请求: http://localhost:${port}/api/faker?fa=name.findName()`);
});

module.exports = app;
