import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from "uuid";

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto : any = {};
  public id:any;
  public token;
  public file : File = undefined!;
  public load_btn = false;
  public load_btn_eliminar = false;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.obtenerProducto(this.id);
      }
    ); 
    
   }

   obtenerProducto(id:any){
    this._productoService.obtener_producto(id, this.token).subscribe(
      response => {
        if(response.data == undefined){
          this.producto = undefined;
        }else{
          this.producto = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
   }

  ngOnInit(): void {
  }

  fileChangeEvent(event:any):void{
    let file;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      // console.log(file);

      if(file.size <= 4000000){

        if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
          this.file = file;
        }else{
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
          });
          $('#input-img').val('');
          this.file = undefined!;
        }
      }else{
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
        });
        $('#input-img').val('');
        this.file = undefined!;
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe subir una imagen'
      });
      $('#input-img').val('');
      this.file = undefined!;
    }
    
    console.log(this.file);
    
  }

  subir_imagen(){
    if(this.file != undefined){
      let data = {
        imagen : this.file,
        _id: uuidv4()
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(
        response => {
          console.log(response);
          this.obtenerProducto(this.id);
          $('#input-img').val('');
        },
        error => {
          console.log(error.error);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe Seleccionar una imagen para subir'
      });
    }
  }

  eliminar(id:any){
    this.load_btn_eliminar = true;
    this._productoService.eliminar_imagen_galeria_admin(this.id, {_id: id} ,this.token).subscribe(
      response => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: 'se ha eliminado correctamente la imagen'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn_eliminar = false;

        this.obtenerProducto(this.id);

      },
      error => {
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          message: error.error
        });

        console.log(error);
        this.load_btn_eliminar = false;

      }
    )
  }

}
