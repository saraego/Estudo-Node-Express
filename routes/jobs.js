const express = require('express')
const route = express.Router()
const job = require('../models/Job')

route.get('/saraego', (req,res)=>{
    res.send('Deu certo')
})//teste se esta funcionando...

//detalhes da vaga
route.get('/view/:id', (req,res) => job.findOne({
    where: {id: req.params.id}
}).then(job =>{
    res.render('view',{
        job
    })
}).catch(err => console.log(err))
)


//rota de envio
route.get('/add', (req,res)=>{
res.render('add')
})

//vamos criar uma rota  post para adcinar o job

route.post('/add', (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body

    //agora iremos inserir dados no sistema... a roda de adicionar

    job.create({
        title, description,salary,company,email,new_job
    }).then(()=>{
        res.redirect('/')
    }).catch(err => console.log(err))
})


module.exports = route