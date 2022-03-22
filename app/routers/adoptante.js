// //Funciona
const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');


routers.get('/adoptante', (req, res)=>{
    let sql;
    if (req.query.id == null)
        sql = "SELECT * FROM adoptante";
    else
        sql = "SELECT * FROM adoptante WHERE id_Adoptante=" + req.query.id;

    mysqlConnection.query(sql, function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            res.send(result);
        }
    })
});




routers.put("/adoptante",
function(request, response){

   
    let params=[request.body.nombre,
        request.body.apellidos,
        request.body.fechaNacimiento,
        request.body.telefono,
        request.body.localidad,
        request.body.direccion,
        request.body.descripcion,
        request.body.imagenPerfil,
        request.body.id];
    
   let sql="UPDATE adoptante SET nombre = COALESCE(?, nombre) ,"+
            "apellidos = COALESCE(?, apellidos) ,"+
            "fechaNacimiento = COALESCE(?, fechaNacimiento) ,"+
            "telefono = COALESCE(?, telefono) ,"+
            "localidad = COALESCE(?, localidad) ,"+
            "direccion = COALESCE(?, direccion) ,"+
            "descripcion = COALESCE(?, descripcion) ,"+
            "imagenPerfil = COALESCE(?, imagenPerfil) WHERE id_Adoptante=?";
                                                                          
                                                                           
    console.log(sql);
  
    mysqlConnection.query(sql, params, function(err, result){

        if(err)
        console.log(err);
        else{
            if(result.affectedRows==1){
                response.send(String(result.affectedRows));
                }
               else
               console.log(result)  
        }
    })
});


module.exports = routers;