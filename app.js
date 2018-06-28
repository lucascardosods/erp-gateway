
let myIP = "34.227.9.205";
let erp_manager_url = "http://"+myIP+":8181";
let IS_RUNNING = "/customer/isrunning/";
let CUSTOMER_LOADING = "/customer/check/";

function customResolver1(host, url,req) {
  console.log('=============');
  console.log('CUSTOM RESOLVER');
  console.log('=============');
  let ar = url.split("/");
  let path = host.split(".")[0];
  let action = ar[1];

  let port = ar[2];
  let client = ar[3];
  if(action === "activate"){
    console.log('ACTIVATE');
    proxy.register("http://"+client+"."+myIP+"", "http://"+myIP+":"+port);
    return {"response" : "true"}
  } else if(action === "deactivate"){
    console.log('DEACTIVATE');
    proxy.unregister("http://"+client+"."+myIP+":8080", "http://"+myIP+":"+port);
    return {"response" : "true"}
  } else {
    return erp_manager_url+CUSTOMER_LOADING+path
  }
}


global.proxy = new require('redbird')({
  port: 8080,
  resolvers: [customResolver1]
});


global.proxy.notFound(function (req, res) {
  res.statusCode = 404;
  res.write('Not great');
  res.end();
});

// proxy.register("http://gateway.localhost:8080", "http://localhost:8282");

proxy.register("http://erp."+myIP+":8080", "http://"+myIP+":8181");
