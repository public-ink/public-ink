import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { BackendService } from './backend.service';
import { AuthorComponent } from './author/author.component';
import { SlugifyPipe } from './slugify.pipe';
import { StringifyPipe } from './stringify.pipe'

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    SlugifyPipe,
    StringifyPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
