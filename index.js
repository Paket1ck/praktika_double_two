const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use('/contact', function(request, response) {
    response.render('contact', {
        title: 'мои контакты',
        emailsVisible: true,
        emails: ['catcat@mycorp.com', 'meow@mycorp.com'],
        phone: '8-800-555-35-35',
    })
})

app.use('/FIO', function(request, response) {
    response.render('FIO', {
        title: 'ФИО',
        fioVisible: true,
        fio: ['Кто-То'],
    })
})

app.use('/info', function(request, response) {
    response.render('info', {
        title: 'краткая информация о себе',
        infoVisible: true,
        info: ['кто я? Кто-То', 'цель? нету', 'сильные стороны? я сам незнаю', 'опыт в работе? 0'],
    })
})

app.use('/main', function(request, response) {
    response.render('main')
})

app.use('/skills', function(request, response) {
    response.render('skills', {
        title: 'способности',
        skillsVisible: true,
        skills: ['моя способность это сон'],
    })
})

app.use('/language', function(request, response) {
    response.render('language', {
        title: 'знание языков',
        languageVisible: true,
        language: ['знаю эльфийский'],
    })
})

app.use('/chego', function(request, response) {
    response.render('chego', {
        title: 'чего-то нехватает',
        chegoVisible: true,
        chego: ['чего?'],
    })
})

app.use('/main', function(request, response) {
    response.render('main')
})
app.listen(3000)