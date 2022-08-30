const httpServer = require('./api/index');

httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});
