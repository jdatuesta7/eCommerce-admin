import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  public vendedor : any = { };
  public token : any;
  public load_btn = false;

  vendedorForm = new FormGroup({
    nombres : new FormControl('', Validators.required),
    apellidos : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    telefono : new FormControl('', Validators.required),
    dni : new FormControl('', Validators.required),
    id_local : new FormControl('', Validators.required),
    nombre_local : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required)
  });

  constructor(
    private _adminService : AdminService,
    private _router : Router
    ) { 
      this.token = this._adminService.getToken();
    }

  ngOnInit(): void {
  }

  onSubmit(form: any){

    if(form.valid){
      this.vendedor = form.value;
      this.vendedor.rol = 'vendedor';
      this.load_btn = true;

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
              dni : new FormControl(''),
              id_local : new FormControl(''),
              nombre_local : new FormControl(''),
              descripcion : new FormControl('')
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

          this.load_btn = false;
          
        },error => {
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: 'Hubo un error en el servidor'
          });

          this.load_btn = false;
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Porfavor complete todos los campos correctamente'
      });
      this.load_btn = false;
    }

    
  }

}
