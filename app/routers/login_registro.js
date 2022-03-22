const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../../config/sql');


//Endpoint de login
router.post('/login', (req, res) => {
    let sql = "SELECT * FROM login WHERE email = '"+req.body.email+"' and password = '"+req.body.password+"'";
    mysqlConnection.query(sql, function (err, result) {
        if(!err){
            if(result.length == 0) {
                res.send({mensaje: "incorrecto"});
            }
            else {
                res.send({mensaje: "correcto", respuesta: result});
            }           
        }
        else {
            res.send(err)
        }
    })
})



//ENDPOINT REGISTRO ADOPTANTE
router.post('/adoptante/registro', (request, res) => {
  
    let sql = "INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, localidad, direccion, email) VALUES('" +request.body.nombre +"', '"+
                                                                                                                            request.body.apellidos +"', '"+
                                                                                                                            request.body.fechaNacimiento +"', '"+
                                                                                                                            request.body.telefono +"', '"+
                                                                                                                            request.body.localidad +"', '"+
                                                                                                                            request.body.direccion +"', '"+
                                                                                                                            request.body.email+"')";

   mysqlConnection.query(sql, function(err, result){
       
    if(!err){
            const id = result.insertId;
                
             mysqlConnection.query("INSERT INTO login (id_adoptante, email, password) VALUES ('" +id +"', '"+
                                                                                        request.body.email +"', '"+
                                                                                        request.body.password+"')",  
            (err, result) => {
             if(!err) res.send({usuario: "adoptante", respuesta: result});
             else console.log(err);
            })
            }
    else res.json(err);
})
})



//ENDPOINT REGISTRO PROTECTORA
router.post('/protectora/registro', (request, res) => {
  
    let sql = "INSERT INTO protectora (nombreProtectora, direccion, localidad, email, telefono) VALUES('" +request.body.nombreProtectora +"', '"+
                                                                                                                            request.body.direccion +"', '"+
                                                                                                                            request.body.localidad +"', '"+
                                                                                                                            request.body.email +"', '"+
                                                                                                                            request.body.telefono+"')";

   mysqlConnection.query(sql, function(err, result){
       
    if(!err){
            const id = result.insertId;
                
             mysqlConnection.query("INSERT INTO login (id_protectora, email, password) VALUES ('" +id +"', '"+
                                                                                        request.body.email +"', '"+
                                                                                        request.body.password+"')",  
            (err, result) => {
             if(!err) res.send({usuario: "protectora", respuesta: result});
             else console.log(err);
            })
            }
    else res.json(err);
})
})

module.exports = router