const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8000; //

app.engine('handlebars', expressHandlebars({
    extname: '.handlebars',
    defaultLayout: false,
    layoutsDir: 'views/layouts/'
}))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('index'))



const fortune = ['Wisdom begin with knowing your self', 'love is not a feeling but action toward another', 'there is always a better life the other side', 'I can do all through christ who stregthen me', 'Heart can only be melted when it reach its lowest moment', 'pride always brings death']
app.get('/about', (req, res) => {
    const MultiFortune = fortune[Math.floor(Math.random() * fortune.length)]
    res.render('about', {fortune: MultiFortune})
})

app.get('/contact', (req, res) => res.render('contact'))

app.use((req, res) =>{
    res.status(404)
    res.render('404')
    
})

app.use((req, res) =>{
    res.status(500)
    res.render('500')
})

app.listen(port, ()=>console.log(`The server is running at the port ${port} to exit tab ctrl C`))