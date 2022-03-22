const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');



routers.post("/finalesFelices",
        function(request, response){
            console.log(request.body)
            
           let sql="INSERT INTO noticias  (titulo, categoria, prioridad, fecha_publicacion, titular, descripcion, imagen, id_Protectora) VALUES ('" +request.body.titulo +"', '"+
                                                                                                                                               
                                                                                                                                                    request.body.categoria +"', '"+
                                                                                                                                                    request.body.prioridad +"', '"+
                                                                                                                                                    request.body.fecha_publicacion +"', '"+
                                                                                                                                                    request.body.titular +"', '"+
                                                                                                                                                    request.body.descripcion +"', '"+
                                                                                                                                                    request.body.imagen +"', '"+
                                                                                                                                                   
                                                                                                                                                    request.body.id_Protectora+"')";
            
          
                mysqlConnection.query(sql, function(err, result){
        
                if(err)
                console.log(err);
                else{
         
                    if(result.insertId)
                    response.send(String(result.insertId));
                    else
                    response.send("-1");
                }
            })
        });

module.exports = routers;