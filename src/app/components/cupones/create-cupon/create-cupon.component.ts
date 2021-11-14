import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _router : Router
  ) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }

  registroCupon(form:any){
    if(form.valid){
      form.value.codigo = form.value.codigo.toUpperCase();
      console.log(form.value);
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(form.value, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            message: 'se ha registrado correctamente el cupon'
          });
          this.load_btn = false;
          
          this._router.navigate(['/panel/cupones']);
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

      this.load_btn = false;
    }
  }

}
