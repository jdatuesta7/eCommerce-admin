import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente : any = {
    nombres : '',
    apellidos : '',
    ciudad : '',
    email : '',
    password : '',
    telefono : '',
    fechaNacimiento : '',
    DNI : '',
    genero : ''
  };

  public token : any;

  clienteForm = new FormGroup({
    nombres : new FormControl(''),
    apellidos : new FormControl(''),
    ciudad : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    telefono : new FormControl(''),
    fechaNacimiento : new FormControl(''),
    DNI : new FormControl(''),
    genero : new FormControl(''),
  });

  constructor(
  private _clienteService : ClienteService,
  private _adminService : AdminService,
  private _router : Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.cliente.nombres = this.clienteForm.controls.nombres.value;
    this.cliente.apellidos = this.clienteForm.controls.apellidos.value;
    this.cliente.ciudad = this.clienteForm.controls.ciudad.value;
    this.cliente.email = this.clienteForm.controls.email.value;
    this.cliente.password = this.clienteForm.controls.password.value;
    this.cliente.fechaNacimiento = this.clienteForm.controls.fechaNacimiento.value;
    this.cliente.DNI = this.clienteForm.controls.DNI.value;
    this.cliente.genero = this.clienteForm.controls.genero.value;
    this.cliente.telefono = this.clienteForm.controls.telefono.value;

    this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
      response => {
        console.log(response);
        if(response.data){
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha registrado correctamente el cliente'
          });

          this.clienteForm = new FormGroup({
            nombres : new FormControl(''),
            apellidos : new FormControl(''),
            ciudad : new FormControl(''),
            email : new FormControl(''),
            password : new FormControl(''),
            telefono : new FormControl(''),
            fechaNacimiento : new FormControl(''),
            DNI : new FormControl(''),
            genero : new FormControl(''),
          });

          this._router.navigate(['/panel/clientes']);

        }else{
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: response.message
          });
        }
        
      },error => {
        console.log(error);

        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'Hubo un error en el servidor'
        })
      }
    );

  }

}
