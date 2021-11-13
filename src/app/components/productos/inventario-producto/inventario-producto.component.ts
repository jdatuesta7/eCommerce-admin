import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id : any;
  public token : any;
  public producto : any = {};
  public url : any;

  constructor(
    private _route : ActivatedRoute,
    private _adminService : AdminService,
    private _productoService : ProductoService
  ) { 
    this.token = _adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);

        this._productoService.obtener_producto(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
              console.log(this.producto);
            }
          },
          error => {
            console.log(error);  
          }
        )
      }
    )
  }

}
