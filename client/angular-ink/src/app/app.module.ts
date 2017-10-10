// angular
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

// ink components
import { AppComponent } from './app.component'
import { AccountComponent } from './account/account.component'
import { AuthorComponent } from './author/author.component'

// ink layout components
import { ContentWidthComponent } from './content-width/content-width.component'
import { LogoComponent } from './logo/logo.component'
import { PaperTreeComponent } from './paper-tree/paper-tree.component'

// ink services
import { UIService } from './ui.service'
import { BackendService } from './backend.service';
import { StringifyPipe } from './stringify.pipe';
import { FileDropComponent } from './file-drop/file-drop.component';
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component'

// routes (ZERO)
const appRoutes: Routes = [
  { path: '', component: PaperTreeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContentWidthComponent,
    LogoComponent,
    PaperTreeComponent,
    AuthorComponent,
    AccountComponent,
    StringifyPipe,
    FileDropComponent,
    PublicationComponent,
    ArticleComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    BackendService,
    UIService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
