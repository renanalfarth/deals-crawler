exports.hardmob = function (exp_req, exp_res) {

  // HARDMOB
  request({
    url: 'http://www.hardmob.com.br/promocoes',
    method: 'GET',
    strictSSL: false,
    encoding: 'ascii',
    headers: {
      'User-Agent': 'Midori',
    },
    }, function(err, res) {

        var result = res.body;

        var $ = cheerio.load(result);

        $('#threads').filter(function() {
          var data = $(this);

          var itens = [];

          $(data.children()).each(function(i, elem) {

            itens.push({
              titulo : $(this).children().children().find('.title').text(),
              link   : $(this).children().children().find('.title').attr('href')
            });

          });

          var promotions = [];
          promotions.push({pagina : 'Hardmob', itens: itens});

          exp_res.json(promotions);

        });

    });

};

exports.weather = function(exp_req, exp_res) {

  request({
    url: 'http://api.openweathermap.org/data/2.5/forecast?q=Blumenau,BR&appid=519db8a2d6031cf367f700cbab038536&units=metric',
    method: 'GET',
    strictSSL: false,
    encoding: 'ascii',
    headers: {
      'User-Agent': 'Midori',
      'Content-Type': 'application/json'
    },
  }, function(err, res) {
      var result = JSON.parse(res.body);

      if(result.cod == 500) {
        var weathers = 'error';
      } else {
        var weathers = [];

        for(i=0;i<result.list.length;i++) {
          weathers.push({
            date    : result.list[i].dt_txt,
            max     : result.list[i].main.temp_max,
            min     : result.list[i].main.temp_min,
            weather : result.list[i].weather[0]
          });
        }
      }


      exp_res.json(weathers);
  });

};

exports.info = function(exp_req, exp_res) {

      exp_res.json({info:'API INFO'});
};
