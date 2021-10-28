import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {
  public clientes : Array<any>=[];
  public filtro_apellidos = '';
  public filtro_correo = '';
  constructor(
    private _clienteService : ClienteService
  ) { }

  ngOnInit(): void {
    this._clienteService.listar_clientes_filtro_admin().subscribe(
      response=>{
       this.clientes = response.data;
       console.log(this.clientes);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
