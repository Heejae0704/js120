const fetch = require("node-fetch");

fetch("https://api.thecatapi.com/v1/images/search")
  .then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    },
    (networkError) => console.log(networkError.message)
  )
  .then((jsonResponse) => {
    console.log(jsonResponse[0].url);
  });

// rebrandly API key: 9450b1122aac4dba9aadff2db40a72e1
// foursqaure client ID: 3XJ5VGJZDEEHI32I11EV1ZPYDDYLMJFTHLJEKI22WRDGRCVF
// foursquare client secret: 2YOHDGK3Z2S2DSVOR0UQIIMIEDMJRNL1NEFHYEC0TVS2Q2OJ
// OpenWeather API key: 7daeeb0a4a8cb5cc2033c47986b59c20

https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=7daeeb0a4a8cb5cc2033c47986b59c20
https://api.openweathermap.org/data/2.5/weather&q=seoul&appid=d4b4e579f41bd79c7942909421b2e5ce