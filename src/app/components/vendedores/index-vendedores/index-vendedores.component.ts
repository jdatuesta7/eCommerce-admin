import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-vendedores',
  templateUrl: './index-vendedores.component.html',
  styleUrls: ['./index-vendedores.component.css']
})
export class IndexVendedoresComponent implements OnInit {

  public vendedores : Array<any> = [];
  public tipo = '';
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 20;

  public token;

  public load_data = true;


  constructor(
    private _adminService : AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getVendedores(null, null);
  }

  getVendedores(tipo : any, filtro : any){
    this.load_data = true;
    this._adminService.listar_vendedores_filtro_admin(tipo, filtro, this.token).subscribe(
      response => {
        this.vendedores = response.data;
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  filtro(tipo:string){
    if(tipo == 'apellidos' && this.filtro_apellidos){
      this.getVendedores(tipo, this.filtro_apellidos);
    }else if(tipo == 'correo' && this.filtro_correo){
      this.getVendedores(tipo, this.filtro_correo)
    }else{
      this.getVendedores(null, null);
    }
  }

  eliminar(id:string){
    this._adminService.eliminar_vendedor_admin(id, this.token).subscribe(
      response => {
        
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'se ha eliminado correctamente el vendedor'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.getVendedores(null, null);

      },error => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'ha ocurrido un error en el servidor'
        });
        console.log(error);
      }
    );
  }

}
