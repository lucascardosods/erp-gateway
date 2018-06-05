let express = require("express");
let path = require("path");
let router = require("./routes/routes_manager");

let erp_manager_url = "http://localhost:8181";
let IS_RUNNING = "/customer/isrunning/";
let CUSTOMER_LOADING = "/customer/check/";

// const request = require('request-promise');


// var customResolver1 = function (host, url, req) {
//   let path = host.split(".")[0];
//   console.log('------');
//   console.log(erp_manager_url + IS_RUNNING + path);
//   console.log('1');
//     request({
//       uri: erp_manager_url + IS_RUNNING + path
//     })
//       .then(function (res) {
//         console.log('2');
//
//         console.log(res);
//         return "google.com"
//       })
//       .catch(function (err) {
//         console.log(err);
//         return 'google.com'
//       });
//
//   console.log('3');
//
// // while(resp === null){}
// // })
// };

function customResolver1(host, url,req) {
  let ar = url.split("/");
  let path = host.split(".")[0];
  let action = ar[1];


  // console.log(ar);
  if(action === "activate"){
    let port = ar[2];
    let client = ar[3];
    console.log('REGISTERED');
    proxy.register("http://"+client+".localhost:8080", "http://localhost:"+port);
    return {"response" : "true"}
  } else if(url === "/deactivate"){
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

// let app = express();
// router(app);

proxy.register("http://gateway.localhost:8080", "http://localhost:8282");

proxy.register("http://erp.localhost:8080", "http://localhost:8181");

proxy.register("http://jose.localhost:8080", "http://localhost:8181/client/apple");

proxy.register("http://g1.localhost:8080", "http://g1.com.br");



//
// app.use(function(req, res, next) {
//   next();
// });
//
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
//
// app.listen(8282);
//
// console.log('Base server online.');
//
// module.exports = app;
