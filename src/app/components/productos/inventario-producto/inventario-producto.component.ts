import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id : any;
  public token : any;
  public producto : any = {};
  public inventarios : Array<any> = [];
  public load_btn = false;
  public inventario : any = {};

  constructor(
    private _route : ActivatedRoute,
    private _adminService : AdminService,
    private _productoService : ProductoService
  ) { 
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        this._productoService.obtener_producto(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;

              this.obtenerInventarios();
            }
          },
          error => {
            console.log(error);  
          }
        );
        
      }
    );

  }

  obtenerInventarios(){
    this._productoService.listar_inventario_producto(this.id, this.token).subscribe(
      response => {
        this.inventarios = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminar(id: any){

    this.load_btn = true;
    this._productoService.eliminar_inventario_producto(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'se ha eliminado correctamente el registro'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this._productoService.listar_inventario_producto(this.id, this.token).subscribe(
          response => {
            console.log(response);
            this.inventarios = response.data;
          },
          error => {
            console.log(error);
          }
        );

        this.load_btn = false;
      },error => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'ha ocurrido un error en el servidor'
        });
        this.load_btn = false;
      }
    );

  }

  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        proveedor: inventarioForm.value.proveedor
      }

      this._productoService.registro_inventario_producto(data, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha agregado el nuevo stock al producto'
          });

          this.obtenerInventarios();
        },
        error => {
          console.log(error);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe completar los campos correctamente'
      });
    }
  }


}
