import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from "uuid";

declare var iziToast:any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public token;
  public categorias : any = {};
  public titulo_cat = '';
  public icono_cat = '';

  constructor(
    private _adminService: AdminService
  ) { 
    this.token = localStorage.getItem('token');
    this._adminService.obtener_categorias_admin(this.token).subscribe(
      response => {
        this.categorias = response.data;
        // console.log(this.categorias);

      },
      error => {
        console.log(error);
      }
    );
   }

  ngOnInit(): void {
  }

  agregar_cat(){
    if (this.icono_cat && this.titulo_cat) {
      this.categorias.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });

      this.icono_cat = '';
      this.titulo_cat = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono'
      })
    }
  }

  actualizar(form:any){
    if(form.valid){
        let data = {
          categorias: this.categorias.categorias
        }

        console.log(data);

        this._adminService.actualizar_categorias_admin('61918cba6bd61d63b5a3a4d6', data, this.token).subscribe(
          response => {
            console.log(response);
            iziToast.show({
              title: 'OK',
              color: 'green',
              position: 'topRight',
              message: 'se ha actualizado correctamente las categorias'
            });
          },
          error => {
            console.log(error);
          }
        )
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      })
    }
  }

}
