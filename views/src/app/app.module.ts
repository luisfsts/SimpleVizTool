import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router'
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { HearderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { ImporteventlogComponent } from './main/importeventlog/importeventlog.component';
import { ProcessmodelComponent } from './main/processmodel/processmodel.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: '',redirectTo: 'main',pathMatch: 'full'},
  {path:'main', component:MainComponent,
    children:[
      {path:'', component:ImporteventlogComponent},
      {path:'importeventlog', component:ImporteventlogComponent},
      {path:'processmodel', component:ProcessmodelComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HearderComponent,
    MenuComponent,
    MainComponent,
    ImporteventlogComponent,
    ProcessmodelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
