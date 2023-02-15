const multer = require('multer');
const rand = require('randomstring');

const filesStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, 'static/uploads/files');
  },
  filename: (req, file, next) => {
    const ext = file.originalname.split('.').pop();
    next(null, rand.generate({
      length: 32,
      charset: 'alphabetic'
    }) + '.' + ext);
  }
});
const filesUpload = new multer({
  storage: filesStorage
});


const site = {
  main: require('./controllers/main')
};

const cms = {
  articles: require('./controllers/cms/articles'),
  files: require('./controllers/cms/files'),
  lang: require('./controllers/cms/lang'),
  slideshow: require('./controllers/cms/slideshow')
};

module.exports = (app, passport) => {

  app
    .get('/', site.main.lang)
    .get('/video', site.main.video)
    .get('/slideshow', site.main.slideshow)
    .get('/:lang', site.main.index)
    
    /*articles*/        
    .get('/:lang/articles', site.main.index)
    .get('/:lang/articles/:id', site.main.article)

    .get('/:lang/panomuseum', site.main.panomuseum)
    .get('/:lang/panomuseum/2', site.main.panomuseum2)
    .get('/:lang/panotheatre', site.main.panotheatre)
    
    /*My*/
    // .get('/:lang/articles', site.main.index)
    .get('/Index', site.main.index)
     .get('/history', site.main.history)
    // .get('/history', (req, res) => {
    //   res.render('history');
    //  })
     .get('/about', (req, res) => {
       res.render('about');
      })
    ;


  app

    .get('/cms/lang', cms.lang.index)
    .post('/cms/lang', filesUpload.any(), cms.lang.save)

    .get('/cms/:lang/articles', cms.articles.index)
    .post('/cms/articles/saveOrder', cms.articles.saveOrder)

    .get('/cms/:lang/articles/add', cms.articles.add)
    .post('/cms/:lang/articles/add', filesUpload.any(), cms.articles.postAdd)

    .get('/cms/:lang/articles/:id/edit', cms.articles.edit)
    .post('/cms/:lang/articles/:id/edit', filesUpload.any(), cms.articles.postEdit)
    .get('/cms/:lang/articles/:id/delete', cms.articles.delete)

    .get('/cms/:lang/articles/:id', cms.articles.subArticle)
    .get('/cms/:lang/articles/add/:id', cms.articles.add)

    .post('/cms/files/delete', cms.files.delete)
    .post('/cms/files/saveFile', filesUpload.single('file'), cms.files.saveFile)
    .post('/cms/files/saveThumb', filesUpload.single('thumb'), cms.files.saveThumb)

    .get('/cms/slideshow', cms.slideshow.index)
    .post('/cms/slideshow/save', filesUpload.any(), cms.slideshow.save);

  return app;
    }