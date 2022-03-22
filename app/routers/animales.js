const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');

routers.get("/animales",
        function(request, response){
            let sql;
            var id = request.query.id;
            var idProtectora= request.query.idProtectora;
            if(id==null && idProtectora==null)
            sql="SELECT * FROM animal";
            else if(idProtectora!=null && id==null ){
                sql="SELECT * FROM animal WHERE id_protectora="+idProtectora;
            }
            else
            sql="SELECT animal.nombre, animal.raza, animal.sexo, animal.imagen, animal.fecha_ingresso, animal.descripcion, animal.tamanyo, protectora.nombreProtectora , protectora.localidad, protectora.telefono, protectora.direccion FROM animal JOIN protectora ON (animal.id_protectora=protectora.id_Protectora) WHERE idAnimal="+id;
            //SELECT animal.nombre, protectora.nombre FROM animal JOIN protectora ON (animal.id_protectora=protectora.id_Protectora) WHERE idAnimal=25
           
            mysqlConnection.query(sql, function(err, result){

                if(err)
                console.log(err);
                else{
                    response.send(result);
                }

            })
        });


routers.post("/animal",
        function(request, response){
            console.log(request.body)
            
           let sql="INSERT INTO animal (nombre, raza, sexo, imagen, tipo_animal, estado, fecha_ingresso, descripcion, id_protectora, tamanyo) VALUES ('" +request.body.nombre +"', '"+
                                                                                                                                               
                                                                                                                                                    request.body.raza +"', '"+
                                                                                                                                                    request.body.sexo +"', '"+
                                                                                                                                                    request.body.imagen +"', '"+
                                                                                                                                                    request.body.tipo_animal +"', '"+
                                                                                                                                                    request.body.estado +"', '"+
                                                                                                                                                    request.body.fecha_ingresso +"', '"+
                                                                                                                                                    request.body.descripcion +"', '"+
                                                                                                                                                    request.body.id_protectora +"', '"+
                                                                                                                                                    request.body.tamanyo+"')";
            
          
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


routers.put("/animal",
        function(request, response){
        
           
            let params=[
                request.body.nombre,
                request.body.raza,
                request.body.sexo,
                request.body.imagen,
                request.body.tipo_animal,
                request.body.estado,
                request.body.fecha_ingresso,
                request.body.descripcion,
                request.body.id_protectora,
                request.body.tamanyo,
                request.body.idAnimal];
            
           let sql="UPDATE animal SET nombre = COALESCE(?, nombre) ,"+
                    "raza = COALESCE(?, raza) ,"+
                    "sexo = COALESCE(?, sexo) ,"+
                    "imagen = COALESCE(?, imagen) ,"+
                    "tipo_animal = COALESCE(?, tipo_animal) ,"+
                    "estado = COALESCE(?, estado) ,"+
                    "fecha_ingresso = COALESCE(?, fecha_ingresso) ,"+
                    "descripcion = COALESCE(?, descripcion) ,"+
                    "id_protectora = COALESCE(?, id_protectora) ,"+
                    "tamanyo = COALESCE(?, tamanyo) WHERE idAnimal=?";
                                                                                  
                                                                                   
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