import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin', data, {headers: headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]):boolean{

    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);

      // console.log(decodedToken);

      if (!decodedToken) {
        localStorage.removeItem('token');
        return false;
      }

    } catch (error) {
      localStorage.removeItem('token');
      console.log(error);
      return false;
    }
    
    return allowRoles.includes(decodedToken['role']);
  }

  listar_vendedores_filtro_admin(tipo:any, filtro:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_vendedores_filtro_admin/'+tipo+'/'+filtro, {headers: headers});
  }

  registro_vendedores_admin(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'/registro_vendedor_admin', data, {headers: headers});
  }

  obtener_vendedor_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'/obtener_vendedor_admin/'+id, {headers: headers});
  }

  actualizar_vendedor_admin(id:any, token:any, data:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+'/actualizar_vendedor_admin/'+id, data, {headers: headers});
  }

  eliminar_vendedor_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+'/eliminar_vendedor_admin/'+id, {headers: headers});
  }
}
