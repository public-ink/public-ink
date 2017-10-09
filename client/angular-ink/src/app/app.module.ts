import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ContentWidthComponent } from './content-width/content-width.component'
import { UIService } from './ui.service';
import { LogoComponent } from './logo/logo.component'
import { PaperTreeComponent } from './paper-tree/paper-tree.component'
import { ShadowComponent } from './shadow/shadow.component';
import { AuthorComponent } from './author/author.component'

@NgModule({
  declarations: [
    AppComponent,
    ContentWidthComponent,
    LogoComponent,
    PaperTreeComponent,
    ShadowComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UIService],
  bootstrap: [AppComponent],

})
export class AppModule { }
