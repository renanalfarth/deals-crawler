exports.gocraw = function (exp_req, exp_res) {

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

          var promotions = [];
          promotions.push({pagina : 'Hardmob'});

          $(data.children()).each(function(i, elem) {

            promotions.push({
              titulo : $(this).children().children().find('.title').text(),
              link   : $(this).children().children().find('.title').attr('href')
            });

          });

          exp_res.json(promotions);

        });



    });

};
