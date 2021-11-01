import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

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


  constructor(
    private _clienteService : ClienteService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getClientes(null, null);
  }

  getClientes(tipo : any, filtro : any){
    this._clienteService.listar_clientes_filtro_admin(tipo, filtro, this.token).subscribe(
      response => {
        this.clientes = response.data;
        // console.log(this.clientes);
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

}
