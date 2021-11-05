import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-vendedor',
  templateUrl: './edit-vendedor.component.html',
  styleUrls: ['./edit-vendedor.component.css']
})
export class EditVendedorComponent implements OnInit {

  public id: string = '';
  public token: any;
  public vendedor: any = {};
  
  vendedorForm = new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    id_local: new FormControl(''),
    nombre_local: new FormControl(''),
    telefono: new FormControl(''),
    descripcion: new FormControl(''),
  });

  constructor(
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);

        this._adminService.obtener_vendedor_admin(this.id, this.token).subscribe(
          response => {
            // console.log(response);

            if(response.data != undefined){
              this.vendedor = response.data;
              
              this.vendedorForm = new FormGroup({
                nombres: new FormControl(this.vendedor.nombres),
                apellidos: new FormControl(this.vendedor.apellidos),
                email: new FormControl(this.vendedor.email),
                dni: new FormControl(this.vendedor.dni),
                id_local: new FormControl(this.vendedor.id_local),
                nombre_local: new FormControl(this.vendedor.nombre_local),
                telefono: new FormControl(this.vendedor.telefono),
                descripcion: new FormControl(this.vendedor.descripcion),
              });
            }else{
              this.vendedor = undefined;
              console.log(response.message)
            }

          },error => {
            console.log(error);
          }
        );
      }
    );
  }

  onSubmit(form: any){
    // console.log(form.value);
    if (form.valid) {
      this._adminService.actualizar_vendedor_admin(this.id, this.token, form.value).subscribe(
        response => {
          if(response.data){
            console.log(response);
            iziToast.show({
              title: 'OK',
              color: 'green',
              position: 'topRight',
              message: 'se ha actualizado correctamente el cliente'
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
          });
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Porfavor complete todos los campos correctamente'
      });
    }
  }

}
