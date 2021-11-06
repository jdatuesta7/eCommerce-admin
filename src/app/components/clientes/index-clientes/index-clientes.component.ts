import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit {

  public clientes : Array<any> = [];
  public tipo = '';
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 20;
  public token;

  public load_data = true;
  public load_btn = false;


  constructor(
    private _clienteService : ClienteService,
    private _adminService : AdminService,
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getClientes(null, null);
  }

  getClientes(tipo : any, filtro : any){
    this.load_data = true;
    this._clienteService.listar_clientes_filtro_admin(tipo, filtro, this.token).subscribe(
      response => {
        this.clientes = response.data;
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  filtro(tipo:string){
    if(tipo == 'apellidos' && this.filtro_apellidos){
      this.getClientes(tipo, this.filtro_apellidos);
    }else if(tipo == 'correo' && this.filtro_correo){
      this.getClientes(tipo, this.filtro_correo)
    }else{
      this.getClientes(null, null);
    }
  }

  eliminar(id: any){

    this.load_btn = true;
    this._clienteService.eliminar_cliente_admin(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'se ha eliminado correctamente el cliente'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.getClientes(null, null);
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

}
