import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {

  public load_data = true;
  public token;
  public filtro = '';
  public productos : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 20;

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {

    if(this._adminService.getUser().rol == 'vendedor'){
      this.obtenerProductos('', this.token, this._adminService.getUser()._id);
    }

    if(this._adminService.getUser().rol == 'admin'){
      this.obtenerProductos('', this.token, null);
    }
    
  }

  obtenerProductos(filtro: any, token: any, id: any){
    this._productoService.listar_productos(filtro, token, id).subscribe(
      response => {
        this.productos = response.data;
        this.load_data = false;
        console.log(this.productos);
      },error => {
        console.log(error);
      }
    )
  }

  filtrar(){
    if(this.filtro){
      if(this._adminService.getUser().rol == 'vendedor'){
        this.obtenerProductos(this.filtro, this.token, this._adminService.getUser()._id);
      }
  
      if(this._adminService.getUser().rol == 'admin'){
        this.obtenerProductos(this.filtro, this.token, null);
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe ingresar el filtro'
      })
    }
  }

  limpiar(){
    if(this._adminService.getUser().rol == 'vendedor'){
      this.obtenerProductos('', this.token, this._adminService.getUser()._id);
    }

    if(this._adminService.getUser().rol == 'admin'){
      this.obtenerProductos('', this.token, null);
    }
  }

}
