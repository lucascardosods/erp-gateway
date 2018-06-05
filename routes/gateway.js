gatewayRouter = function(router) {


  router.get("/gateway/register", function(req, res) {
    console.log('register');
    global.proxy.register("http://g1.localhost:8080", "http://g1.com.br");
    res.send({})
  });


  router.get("/gateway/unregister", function(req, res) {
    console.log('unregister');
    global.proxy.unregister("http://g1.localhost:8080", "http://g1.com.br");
    global.proxy.register("http://g1.localhost:8080", "google.com");
    res.send({})

  });

};

module.exports = gatewayRouter;
