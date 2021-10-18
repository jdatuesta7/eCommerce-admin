import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public token : any = '';

  constructor
  (
    private _adminService:AdminService,
    private _router: Router
  ){ 
    $('body').attr('style', 'background:white!important');
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(!this.token){
      this._router.navigate(['/']);
    }
  }

}
