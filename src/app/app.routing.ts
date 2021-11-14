import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guard/admin.guard";
import { IndexClientesComponent } from "./components/clientes/index-clientes/index-clientes.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { IndexVendedoresComponent } from "./components/vendedores/index-vendedores/index-vendedores.component";
import { CreateVendedorComponent } from "./components/vendedores/create-vendedor/create-vendedor.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { EditVendedorComponent } from "./components/vendedores/edit-vendedor/edit-vendedor.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductosComponent } from "./components/productos/index-productos/index-productos.component";
import { InventarioProductoComponent } from "./components/productos/inventario-producto/inventario-producto.component";
import { CreateCuponComponent } from "./components/cupones/create-cupon/create-cupon.component";
import { IndexCuponComponent } from "./components/cupones/index-cupon/index-cupon.component";

const appRoute: Routes = [
    {path: '', component: LoginComponent},
    // {path: '**', component: LoginComponent},

    {path: 'inicio', component: InicioComponent},

    {path: 'panel', children: [
        {path: 'clientes', component: IndexClientesComponent, canActivate: [AdminGuard]},
        {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard]},
        {path: 'clientes/editar/:id', component: EditClienteComponent, canActivate: [AdminGuard]},

        {path: 'vendedores', component: IndexVendedoresComponent, canActivate: [AdminGuard]},
        {path: 'vendedores/registro', component: CreateVendedorComponent, canActivate: [AdminGuard]},
        {path: 'vendedores/editar/:id', component: EditVendedorComponent, canActivate: [AdminGuard]},

        {path: 'productos', component: IndexProductosComponent},
        {path: 'productos/registro', component:CreateProductoComponent},
        {path: 'productos/inventario/:id', component: InventarioProductoComponent},

        {path: 'cupones', component: IndexCuponComponent, canActivate: [AdminGuard]},
        {path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard]},

    ]}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
