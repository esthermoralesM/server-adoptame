const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');

routers.get('/protectora', (req, res)=>{
    let sql;
    if (req.query.id == null)
        sql = "SELECT * FROM protectora";
    else
        sql = "SELECT * FROM protectora WHERE id_Protectora=" + req.query.id;

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


routers.put("/protectora",
function(request, response){

   
    let params=[request.body.nombreProtectora,
        request.body.direccion,
        request.body.localidad,
        request.body.telefono,
        request.body.imagen,
        request.body.descripcion,
        request.body.id];
    
   let sql="UPDATE protectora SET nombreProtectora = COALESCE(?, nombreProtectora) ,"+
            "direccion = COALESCE(?, direccion) ,"+
            "localidad = COALESCE(?, localidad) ,"+
            "telefono = COALESCE(?, telefono) ,"+
            "imagen = COALESCE(?, imagen) ,"+
            "descripcion = COALESCE(?, descripcion) WHERE id_Protectora=?";
                                                                          
                                                                           
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