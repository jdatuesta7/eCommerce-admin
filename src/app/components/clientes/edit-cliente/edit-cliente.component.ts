import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public id: string = '';
  public token: any;
  public cliente: any = {};
  public load_btn = false;
  public load_data = true;
  public colombia_lugares : Array<any> = []; 
  public arr_municipios : Array<any> = []; 

  clienteForm = new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    ciudad: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    f_nacimiento: new FormControl(''),
    dni: new FormControl(''),
    genero: new FormControl(''),
  });

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _ciudadesService : CiudadesService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response => {

            if (response.data != undefined) {

              this.cliente = response.data;
              // console.log(this.cliente);

              this.clienteForm = new FormGroup({
                nombres: new FormControl(this.cliente.nombres),
                apellidos: new FormControl(this.cliente.apellidos),
                ciudad: new FormControl(this.cliente.ciudad),
                email: new FormControl(this.cliente.email),
                telefono: new FormControl(this.cliente.telefono),
                f_nacimiento: new FormControl(this.cliente.f_nacimiento),
                dni: new FormControl(this.cliente.dni),
                genero: new FormControl(this.cliente.genero),
              });

              this.load_data = false;
              
            } else {
              this.cliente = undefined;
              this.load_data = false;
              console.log(response.message);
            }

          }, error => {
            console.log(error);
          }
        )
      }
    );

    this._ciudadesService.listar_ciudades_colombia().subscribe(
      response => {
        this.colombia_lugares = response;
        this.colombia_lugares.forEach(element => {
          this.arr_municipios.push(element.municipio);
        })

        // console.log(this.arr_municipios);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: any) {
    console.log(this.cliente);
    if(form.valid){
      
      this.load_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id, form.value, this.token).subscribe(
        response => {
          if(response.data){
            console.log(response);
            iziToast.show({
              title: 'OK',
              color: 'green',
              position: 'topRight',
              message: 'se ha actualizado correctamente el cliente'
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
            message: error.error.message
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
    }
  }
}
