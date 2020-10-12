var CubejsServerCore = require('@cubejs-backend/server-core');
// ...
app.use('/', indexRouter);


var cubejsApi = cubejs(
    'YOUR-API-TOKEN',
    { apiUrl: 'http://localhost:3000/cubejs-api/v1' }
);
  
var kpis = [
    { measure: "Tweets.count", element: "total-tweets" },
    { measure: "Tweets.retweetCount", element: "total-retweets" },
    { measure: "Tweets.favoriteCount", element: "total-favorites" }
  ];
  
  kpis.forEach(kpi => {
    cubejsApi
      .load({
        measures: [kpi.measure]
      })
      .then(resultSet => {
        document.getElementById(kpi.element).textContent = numeral(
          resultSet.totalRow()[kpi.measure]
        ).format("0,0");
      });
  });
require('dotenv').config();
CubejsServerCore.create().initApp(app);