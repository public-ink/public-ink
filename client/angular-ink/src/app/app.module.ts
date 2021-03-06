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

// ink content components
import { ContentWidthComponent } from './content-width/content-width.component'
import { LogoComponent } from './logo/logo.component'
import { PaperTreeComponent } from './paper-tree/paper-tree.component'
import { AuthorPageComponent } from './author-page/author-page.component'
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component'
import { EditorComponent } from './editor/editor.component'

// animation examples
import { DashboardComponent } from './dashboard'
import { ProfileDetailsComponent } from './profile-details'
import { ProfileStatsComponent } from './profile-stats'

// ink services
import { UIService } from './ui.service'
import { BackendService } from './backend.service'
import { AnimationService } from './animation.service'
import { LogService } from './log.service'


// ink pipes
import { StringifyPipe } from './stringify.pipe'

import { FileDropComponent } from './file-drop/file-drop.component'

// ink directives
import { AutosizeDirective } from './autosize.directive';
import { PublicationPageComponent } from './publication-page/publication-page.component';
import { AuthorAccordionComponent } from './author-accordion/author-accordion.component';
import { AnitestComponent } from './anitest/anitest.component';
import { PublicationAccordionComponent } from './publication-accordion/publication-accordion.component';
import { ArrowComponent } from './arrow/arrow.component';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { DesignComponent } from './design/design.component';


// routes (ZERO)
const appRoutes: Routes = [
  // specials
  { path: 'design', component: DesignComponent},

  // content tree
  { path: ':authorID/:publicationID/:articleID', component: ArticlePageComponent },
  { path: ':authorID/:publicationID', component: AuthorPageComponent },
  { path: ':authorID', component: AuthorPageComponent },
  { path: 'account', component: PaperTreeComponent},
  { path: '', component: HomePageComponent},
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
    ArticleComponent,
    AutosizeDirective,
    AuthorPageComponent,
    HomePageComponent,
    PublicationPageComponent,
    ArticlePageComponent,
    AuthorAccordionComponent,
    AnitestComponent,
    PublicationAccordionComponent,

    DashboardComponent,
    ProfileDetailsComponent,
    ProfileStatsComponent,
    ArrowComponent,
    EditorComponent,
    ArticleContainerComponent,
    DesignComponent,
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
    UIService,
    BackendService,
    AnimationService,
    LogService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
