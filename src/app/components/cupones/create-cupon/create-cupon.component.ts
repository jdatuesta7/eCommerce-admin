import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public load_btn : any = false;
  public cupon : any = {
    tipo : ''
  };
  public token : any;

  constructor(
    private _cuponService: CuponService,
  ) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }

  registroCupon(form:any){
    if(form.valid){
      form.value.codigo = form.value.codigo.toUpperCase();
      console.log(form.value);
      this._cuponService.registro_cupon_admin(form.value, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha registrado correctamente el cupon'
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
        message: 'Porfavor complete todos los campos correctamente'
      });
    }
  }

}
