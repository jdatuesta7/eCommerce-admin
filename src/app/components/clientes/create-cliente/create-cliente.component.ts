import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  public cliente : any = {};
  public token : any;
  public load_btn = false;

  clienteForm = new FormGroup({
    nombres : new FormControl('', Validators.required),
    apellidos : new FormControl('', Validators.required),
    ciudad : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    telefono : new FormControl('', Validators.required),
    f_nacimiento : new FormControl('', Validators.required),
    dni : new FormControl('', Validators.required),
    genero : new FormControl('', Validators.required),
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

  onSubmit(form : any){

    if(form.valid){

      this.cliente = form.value;
      this.load_btn = true;
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
          
          this.load_btn = false;

        },error => {
          console.log(error);

          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: 'Hubo un error en el servidor'
          })

          this.load_btn = false;
        }
      );

    }

  }

}
