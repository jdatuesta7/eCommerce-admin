import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token : any = '';

  constructor
  (
    private _adminService:AdminService,
    private _router: Router
  ){ 
    $('body').attr('style', 'background:#000!important');
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/inicio'])
    }
  }

  login(loginForm:any) {
    if(loginForm.valid){
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      };

      this._adminService.login_admin(data).subscribe(
        response=>{
          console.log(response);
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              theme: 'dark',
              position: 'topRight',
              titleColor: '#FF0000',
              message: response.message
            })
          }else{
            
            let msg = 'Hola de nuevo, '+response.data.nombres+'!';

            this.usuario = response.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response.data));

            this._router.navigate(['/inicio']);

            iziToast.show({
              title: 'BIENVENIDO',
              theme: 'dark',
              position: 'topRight',
              titleColor: '#FFFFFF',
              message: msg
            })
          }

        },
        error=>{
          console.log(error);

        }
      );      
    }else{
      iziToast.show({
        title: 'ERROR',
        theme: 'dark',
        position: 'topRight',
        titleColor: '#FF0000',
        message: 'Debe ingresar su correo y contraseña'
      })
    }
  }

}
