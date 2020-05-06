var express = require('express')
let app =express()
var fs= require('fs');
var path = require('path')
var bodyParser= require('body-parser')



   
app.use('/static',express.static('public'))

var urlencodedParcer=bodyParser.urlencoded({extended:false})
app.set('view engine','ejs')
app.get('/content',function(req,res){
    var obj = JSON.parse(fs.readFileSync('departemnt.Json', 'utf8'));
    var nm=[];
    let i=0;
  while(i<obj.length){
      nm[i]=obj[i].value.nome
      i++;
  }
    
    res.render('pages/index.ejs',{test: nm})
});

app.post('/content',urlencodedParcer,function(req,res){
    
    if(req.body.nome === '' || req.body.desc === '')
         {
          res.render('pages/index.ejs',{error:"Vous n'avais pas complete les deux champe" })
         }

    else{
        res.render('pages/index.ejs',{error:"" , valid:"Votre département a été ajouté" })
        fs.readFile('departemnt.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            else{
                data =JSON.parse(jsonString) ;
                var value=req.body;
                var id =Math.floor(Math.random() * 100000);
                var f={id:id,value}
                data.push(f);
                dataUpdated=JSON.stringify(data);
                fs.writeFileSync('departemnt.json', dataUpdated );
                console.log('save')
                res.end();
            }
    })
} 

})
app.post('/desc',urlencodedParcer,function(req,res){
console.log('ok');
var valueSelect=req.body.select;
let i=0;
var obj = JSON.parse(fs.readFileSync('departemnt.Json', 'utf8'));
while(obj[i].value.nome != valueSelect ){
    i++;
    
}
res.render('pages/index',{test1: obj[i].value})
})





app.listen(8888)