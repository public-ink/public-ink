import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

// services
import { BackendService } from './backend.service'
import { StyleService } from './style.service'
import { UIService } from './ui.service'

// routing
import { RouterModule, Routes } from '@angular/router'
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component';
import { AuthorComponent } from './author/author.component';
import { UniverseComponent } from './universe/universe.component';
import { AllComponent } from './all/all.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { MediaBarComponent } from './media-bar/media-bar.component';
import { FileDropComponent } from './file-drop/file-drop.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component'

/*const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':authorID',   component: AuthorComponent },
  { path: ':authorID/:publicationID',   component: PublicationComponent },
  { path: ':authorID/:publicationID/:articleID', component: ArticleComponent },
  //{ path: '**', component: PageNotFoundComponent }
]*/
const appRoutes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  { path: '', component: HomeComponent },
  { path: ':authorID',   component: AuthorComponent },
  { path: ':authorID/:publicationID',   component: PublicationComponent },
  { path: ':authorID/:publicationID/:articleID', component: ArticleComponent },
  //{ path: '**', component: PageNotFoundComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationComponent,
    ArticleComponent,
    AuthorComponent,
    UniverseComponent,
    AllComponent,
    PlaygroundComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    MediaBarComponent,
    FileDropComponent,
    ArticlePreviewComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BackendService,
    StyleService,
    UIService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    /*AppComponent*/
    UniverseComponent
  ]
})
export class AppModule { }
