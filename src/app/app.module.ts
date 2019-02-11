import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// in-memory
//estas duas linhas devem ser removidas num back end real - elas são usadas somente para simulação
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-databases';
// in-memory

import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)//usada somente para simualação
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
