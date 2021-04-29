const fs = require('fs');

module.exports = function setup(app) {
  app.get('/api/cal', function(req, res) {
    fs.readFile(__dirname + '/mock/cal.json', function(r, data) {
      res.send(data);
    });
  });
};
