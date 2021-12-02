import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {};
  public id: any;
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer;
  public config: any = {};
  public token: any;
  public load_btn = false;
  public usuario: any = {};
  public categorias: any = {};
  public load_data = true;
  public url;
  actualizarproductoForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required)
  });

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.config = {
      height: 500
    }
    this.token = localStorage.getItem('token');
    this._adminService.obtener_categorias_publico().subscribe(
      response => {
        console.log(response);
        this.categorias = response.data;
      },
      error => {
        console.log(error);
      }
    );

    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);

        this._productoService.obtener_producto(this.id, this.token).subscribe(
          response => {
            console.log(response)
            if (response.data != undefined) {
              this.producto = response.data;
              this.imgSelect = this.url + 'obtener_portada/' + response.data.portada;
              this.actualizarproductoForm = new FormGroup({
                titulo: new FormControl(this.producto.titulo),
                stock: new FormControl(this.producto.stock),
                precio: new FormControl(this.producto.precio),
                categoria: new FormControl(this.producto.categoria),
                descripcion: new FormControl(this.producto.descripcion),
                contenido: new FormControl(this.producto.contenido)
              });
              this.load_data = false;

            } else {
              this.producto = undefined;
              this.load_data = false;
              console.log(response.message);
            }
          }, error => {
            console.log(error);
          }
        );
      }
    );
  }


  onSubmit(form: any) {
    if (form.valid) {
      this.producto = form.value;
      this.producto.admin = this._adminService.getUser()._id;

      let data: any = {};

      if (this.file != undefined) {
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;

      this.load_btn = true;
      console.log(data);
      this._productoService.actualizar_producto(data, this.id, this.token).subscribe(
        response => {
          console.log(response);

          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha actualizado correctamente el producto'
          });

          this.load_btn = false;
          this._router.navigate(['/panel/productos']);

        }, error => {
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
    } else {
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Porfavor complete todos los campos correctamente'
      });

    }
  }

  fileChangeEvent(event: any): void {
    let file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      // console.log(file);

      if (file.size <= 4000000) {

        if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
          const reader = new FileReader();
          reader.onload = e => this.imgSelect = reader.result;
          reader.readAsDataURL(file);

          $('#input-portada').text(file.name);
          this.file = file;
          // console.log(this.file);
        } else {
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect = this.url + 'obtener_portada/' + this.producto.portada;
        }
      } else {
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = this.url + 'obtener_portada/' + this.producto.portada;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe subir una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = this.url + 'obtener_portada/' + this.producto.portada;
    }

  }
}
