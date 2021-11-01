import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-vendedor',
  templateUrl: './create-vendedor.component.html',
  styleUrls: ['./create-vendedor.component.css']
})
export class CreateVendedorComponent implements OnInit {

  public vendedor : any = {
    nombres : '',
    apellidos : '',
    email : '',
    password : '',
    telefono : '',
    dni : '',
    id_local : '',
    nombre_local : '',
    rol : 'vendedor'
  };

  public token : any;

  vendedorForm = new FormGroup({
    nombres : new FormControl(''),
    apellidos : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    telefono : new FormControl(''),
    DNI : new FormControl(''),
    id_local : new FormControl(''),
    nombre_local : new FormControl('')
  });

  constructor(
    private _adminService : AdminService,
    private _router : Router
    ) { 
      this.token = this._adminService.getToken();
    }

  ngOnInit(): void {
  }

  onSubmit(){

    this.vendedor.nombres = this.vendedorForm.controls.nombres.value;
    this.vendedor.apellidos = this.vendedorForm.controls.apellidos.value;
    this.vendedor.email = this.vendedorForm.controls.email.value;
    this.vendedor.password = this.vendedorForm.controls.password.value;
    this.vendedor.telefono = this.vendedorForm.controls.telefono.value;
    this.vendedor.dni = this.vendedorForm.controls.DNI.value;
    this.vendedor.id_local = this.vendedorForm.controls.id_local.value;
    this.vendedor.nombre_local = this.vendedorForm.controls.nombre_local.value;

    // console.log(this.vendedor);

    this._adminService.registro_vendedores_admin(this.vendedor, this.token).subscribe(
      response => {
        console.log(response);
        if(response.data){
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha registrado correctamente el vendedor'
          });

          this.vendedorForm = new FormGroup({
            nombres : new FormControl(''),
            apellidos : new FormControl(''),
            email : new FormControl(''),
            password : new FormControl(''),
            telefono : new FormControl(''),
            DNI : new FormControl(''),
            id_local : new FormControl(''),
            nombre_local : new FormControl(''),
          });

          this._router.navigate(['/panel/vendedores']);

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
