import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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


  constructor(
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getVendedores(null, null);
  }

  getVendedores(tipo : any, filtro : any){
    this._adminService.listar_vendedores_filtro_admin(tipo, filtro, this.token).subscribe(
      response => {
        this.vendedores = response.data;
        // console.log(this.vendedores);
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

}
