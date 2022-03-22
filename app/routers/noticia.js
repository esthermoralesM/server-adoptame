const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');

routers.get('/noticias', (req, res)=>{
    let sql;
    let id=req.query.id;
    let id_Protectora= req.query.id_Protectora;

    if (id == null  && id_Protectora==null)
        sql = "SELECT * FROM noticias";
    else if(id_Protectora==null && id!=null )
        sql = "SELECT * FROM noticias WHERE idNoticias=" + id;
    else 
        sql = "SELECT * FROM noticias WHERE id_Protectora=" + id_Protectora;

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

routers.post("/noticias",
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


routers.put("/noticia",
        function(request, response){
        
           
            let params=[
                request.body.titulo,
                request.body.categoria,
                request.body.prioridad,
                request.body.fecha_publicacion,
                request.body.titular,
                request.body.descripcion,
                request.body.imagen,
                request.body.id_Protectora,
                request.body.idNoticias];
            
           let sql="UPDATE noticias SET titulo = COALESCE(?, titulo) ,"+
                    "categoria = COALESCE(?, categoria) ,"+
                    "prioridad = COALESCE(?, prioridad) ,"+
                    "fecha_publicacion = COALESCE(?, fecha_publicacion) ,"+
                    "titular = COALESCE(?, titular) ,"+
                    "descripcion = COALESCE(?, descripcion) ,"+
                    "imagen = COALESCE(?, imagen) ,"+
                    "id_Protectora = COALESCE(?, id_Protectora) WHERE idNoticias=?";
                                                                  
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

routers.delete('/noticias',(req, res)=>{
            var idNoticia= req.body.idNoticias;
            let sql="DELETE FROM noticias WHERE idNoticias="+idNoticia;
            console.log(idNoticia)
        
            mysqlConnection.query(sql, function(err, result){
            
                if(err)
                console.log(err);
                else{  
                    if(result.affectedRows==1)
                      res.send(String(result.affectedRows));
                     else
                       res.send("0");
                }
            })
        })



module.exports = routers;