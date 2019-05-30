//------------Pagina de Registro de Usuario------------------//
exports.signup = function(req,res){
   message = "";
   if (req.method == "POST"){
       var post = req.body;
       var nombre = post.nombre;
       var apellido = post.apellido;
       var mobile = post.mobile;
       var usuario = post.usuario;
       var pass = post.password;
       //var email = post.email;


       var sql ="INSERT INTO usuarios(nombre,apellido,mobile,usuario,password) VALUES('"+ nombre + "','" + apellido + "','" +  mobile + "','" + usuario + "','" + pass +"')";
       console.log(sql)
       var query = db.query(sql,function(err,result){
           message = "Su Cuenta se ha Creado con exito";
           res.render("signup.ejs",{message:message});
       });
   } else {
       res.render('signup');
   }
};
//------------Pagina de Autenticacion------------------//
exports.login = function(req,res){
   var message = "";
   var sess = req.session;

   if (req.method == "POST"){
       var post = req.body;
       var usuario = post.usuario;
       var pass = post.password;
       var sql ="SELECT id,nombre,apellido,mobile,usuario,email from usuarios where usuario ='"+ usuario +"' and password ='" + pass + "'";
       db.query(sql,function(err,results){
           if (results.length){
               req.session.id= results[0].id;
               req.session.usuario = results[0];
               console.log(results[0].id);
               res.redirect('/home/dashboard');
           }
           else{
               message ='Escriba sus credenciales';
               res.render('index.ejs',{message:message});
           }
       });
   }else{
       res.render('index.ejs',{message:message});
   }
};

//----------Pagina Dashboard------------------
exports.dashboard =function(req,res,next){
  var usuario = req.session.usuario,
   userid= req.session.id;
   console.log("Aca debe estar el ID el usuario autenticado" + userid);
   if(userid == null){
       res.redirect("/login");
       return;
   }
   var sql ="SELECT * from usuarios where id ='" + userid +"'";
   db.query(sql,function(err,results){
       res.render('dashboard.ejs',{user:user});
   });
};

//--------------Final de Session----------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err){
       res.redirect("/login");
   })
};

//-----------Pagina de Profile-----------------------------------------
exports.profile =function(req,res){
   var userid =req.session.id;
   if (userid == null) {
       res.redirect("/login");
       return;
   }

   var sql = "select * from  usuarios where id='" + userid +"'";
   db.query(sql,function(err,result){
       res.render('profile.ejs',{data:result});
   })
};