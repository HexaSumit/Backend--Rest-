const express=require("express");
const app=express();

const port=3000;

const path=require('path')

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

//Home route
app.get('/',(req,res)=>{
    res.send('Enter /posts after localhost:3000 in the url to see content')
})

let posts=[
    {
        id:1,
        username:'Sumit',
        content:'Hello world! from Sumit :)'
    },
    {
        id:2,
        username:'Bhardwaj',
        content:'Hello world! from Bhardwaj'
    },
    {
        id:3,
        username:'Mr Sumit Bhardwaj',
        content:'Hello world! from Sumit Bhardwaj !!'
    },
]
app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts})   
})

app.get('/posts/new',(req,res)=>{
    res.render('form.ejs')
})

app.post('/posts',(req,res)=>{
    let {username,content}=req.body;
    posts.push({username,content});
    // res.send('Post request Working! Form submitted successfully :)')
    res.redirect('/posts')
})

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    // console.log(typeof id, id); agar bina number mai convert krke karu toh string id milti hai joki undefined dega
    id = Number(id)
    let filterdPost=posts.find((p)=>p.id===id);
    // console.log(filterdPost)
    res.render('show.ejs',{filterdPost})
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})