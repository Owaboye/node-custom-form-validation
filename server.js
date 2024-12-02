const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const app = express()

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static('public'))

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
  );

  app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) =>{
     let emailErr = ''
     let passwordErr = ''
     let email = ''
     let password = ''
     
    const error = {
        emailErr,
        passwordErr
    }

    const data = {
        email, password
    }

    res.render('index', {error, data})
})

app.post('/', (req, res) =>{
   const {email, password } = req.body
   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const regexPass = /^\S*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S*[\W])[a-zA-Z\d]{8,}\S*$/;
   let emailErr = ''
   let passwordErr = ''
   
    if(email == ""){
        emailErr = "The email field is required"
    }else if(!regex.test(email)){
        emailErr = "The email field is not valid"
    }

    if(password == ""){
        passwordErr = "The password field is required"
    }else if(!regexPass.test(password)){
        passwordErr = "Min 8 chars long, Min One Digit, Min One Uppercase, Min One Lower Case, Min One Special Chars"
    }

    const error = {
        emailErr,
        passwordErr
    }

    const data = {
        email, password
    }

    if(emailErr || passwordErr){
        res.render('index', {error, data})
        return 
    }

    res.json(req.body)
})


app.listen(3000, () => {
    console.log('Server running ')
})

