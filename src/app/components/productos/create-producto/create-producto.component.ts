import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto : any = {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default-placeholder.png';
  public config : any = {};
  public token : any;
  public load_btn = false;
  public usuario : any = {};
  public categorias : any = {};

  productoForm = new FormGroup({
    titulo : new FormControl('', Validators.required),
    stock : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.required),
    categoria : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required),
    contenido : new FormControl('', Validators.required)
  });

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router : Router
  ) {
    this.config = {
      height: 500
    }
    this.usuario = this._adminService.getUser();
    this.token = this._adminService.getToken();
    this._adminService.obtener_categorias_publico().subscribe(
      response => {
        console.log(response);
        this.categorias = response.data;
      },
      error => {
        console.log(error);
      }
    )
   }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    if(form.valid){
      if (this.file == undefined) {
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'Debe subir una imagen del producto'
        });
      }else{
        this.producto = form.value;
        this.producto.admin = this._adminService.getUser()._id;
        this.load_btn = true;
        this._productoService.registro_producto(this.producto, this.file, this.token).subscribe(
          response =>{
            console.log(response);

            iziToast.show({
              title: 'OK',
              color: 'green',
              position: 'topRight',
              message: 'se ha registrado correctamente el producto'
            });

            this.load_btn = false;

            this.productoForm = new FormGroup({
              titulo : new FormControl(''),
              stock : new FormControl(''),
              precio : new FormControl(''),
              categoria : new FormControl(''),
              descripcion : new FormControl(''),
              contenido : new FormControl('')
            });

            this._router.navigate(['/panel/productos']);

          },error =>{
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
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Porfavor complete todos los campos correctamente'
      });

    }
  }

  fileChangeEvent(event:any):void{
    let file;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      // console.log(file);

      if(file.size <= 4000000){

        if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
          const reader = new FileReader();
          reader.onload = e => this.imgSelect = reader.result;
          reader.readAsDataURL(file);

          $('#input-portada').text(file.name);
          this.file = file;
          console.log(this.file);
        }else{
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect = 'assets/img/default-placeholder.png';
        }
      }else{
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/default-placeholder.png';
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe subir una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/default-placeholder.png';
    }

  }
}
