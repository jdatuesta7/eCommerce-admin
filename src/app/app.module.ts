import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from 'ngx-tinymce';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { IndexVendedoresComponent } from './components/vendedores/index-vendedores/index-vendedores.component';
import { CreateVendedorComponent } from './components/vendedores/create-vendedor/create-vendedor.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { EditVendedorComponent } from './components/vendedores/edit-vendedor/edit-vendedor.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductosComponent } from './components/productos/index-productos/index-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientesComponent,
    CreateClienteComponent,
    IndexVendedoresComponent,
    CreateVendedorComponent,
    EditClienteComponent,
    EditVendedorComponent,
    CreateProductoComponent,
    IndexProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
