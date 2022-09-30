const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParse = require('body-parser')
const Job = require('./models/Job')
const { search } = require('./routes/jobs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const port = 3000


app.listen(port, function(){
    console.log(`O express está rodanndo na porta ${port}`);
})

// devemos dizer que iremos usar o bodyparse
app.use(bodyParse.urlencoded({extended:false}))

// Handle bars

app.set('views', path.join(__dirname, 'views'))//diretorios da nossa viow
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))//arquivo  principal do layout sera o main
app.set('view engine', 'handlebars')

//pasta de arquivos estaticos
app.use(express.static(path.join(__dirname,'public')))

// db conexao com banco
db
.authenticate()
.then(()=>{
    console.log("conectou ao banco com sucesso");
})
.catch(err => console.log("Ocorreu o erro ao conectar",err))


//rotas 
app.get('/', (req,res)=>{

    let search = req.query.job
    let query = '%'+search+'%'

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]}).then(jobs=>{
            res.render('index',{
                jobs
            })
        })
        .catch(err => console.log(err))
    }else{
        Job.findAll({
            where:{title: {[Op.like]:query}},
            order: [
            ['createdAt', 'DESC']
        ]}).then(jobs=>{
            res.render('index',{
                jobs,search
            })
        })
        .catch(err => console.log(err))
    }

   
    
})

//jobs rotas 
app.use('/jobs', require('./routes/jobs'))