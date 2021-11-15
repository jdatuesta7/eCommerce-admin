import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  registro_producto(data:any , file:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization': token});

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('categoria', data.categoria);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('admin', data.admin);
    fd.append('portada', file);

    return this._http.post(this.url+'registro_producto', fd, {headers: headers});
  }

  listar_productos(filtro:any, token:any, id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_productos/'+id+'/'+filtro, {headers: headers});
  }

  obtener_producto(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_producto/'+id, {headers: headers});
  }

  listar_inventario_producto(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_inventario_producto/'+id, {headers: headers});
  }

  eliminar_inventario_producto(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_inventario_producto/'+id, {headers: headers});
  }

  registro_inventario_producto(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_inventario_producto/', data, {headers: headers});
  }

  agregar_imagen_galeria_admin(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization': token});

    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('imagen', data.imagen);

    return this._http.put(this.url+'agregar_imagen_galeria_admin/'+id, fd, {headers: headers});
  }

  eliminar_imagen_galeria_admin(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization': token});
    return this._http.put(this.url+'eliminar_imagen_galeria_admin/'+id, data, {headers: headers});
  }
}
