webpackJsonp([1,4],{

/***/ 1097:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(474);


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    name: 'development',
    production: false,
    public: true,
    backend: 'http://localhost:8080/api'
};
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/environment.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Resource */
/* unused harmony export Author */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Publication; });
/* unused harmony export Article */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Base class representing a resource, it is the basis for:
 * - Author
 * - Publication
 * - Article
 * - Comment
 */
var Resource = (function () {
    function Resource(data) {
        this.url = data.url;
        this.id = data.id;
    }
    return Resource;
}());
var Author = (function (_super) {
    __extends(Author, _super);
    function Author(data) {
        _super.call(this, data);
        this.publications = [];
        this.type = 'author';
        this.name = data.nameText;
        this.nameText = data.nameText;
        this.about = data.about;
        this.aboutText = data.aboutText;
        this.imageUrl = data.imageUrl;
        this.deleted = data.deleted;
        this.created = data.created;
        this.updated = data.updated;
        for (var _i = 0, _a = data.publications; _i < _a.length; _i++) {
            var publication = _a[_i];
            this.publications.push(new Publication(publication));
        }
    }
    /** The data this resources puts/posts to the backend */
    Author.prototype.data = function () {
        return {
            name: this.name,
            nameText: this.nameText,
            about: this.about,
            aboutText: this.aboutText,
            imageUrl: this.imageUrl,
        };
    };
    /**
     * data validation (expand, refactor)
     */
    Author.prototype.isValid = function () {
        if (!this.nameText || this.nameText === '') {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Creates and returns a 'New Author' instance
     */
    Author.createNew = function () {
        var data = {
            id: 'new',
            url: 'http://localhost:8080/author/new',
            name: '',
            nameText: '',
            about: '',
            aboutText: '',
            imageUrl: '',
            deleted: false,
            publications: [],
        };
        return new this(data);
    };
    return Author;
}(Resource));
var Publication = (function (_super) {
    __extends(Publication, _super);
    function Publication(data) {
        _super.call(this, data);
        // related
        this.articles = [];
        this.type = 'publication';
        this.name = data.name;
        this.nameText = data.nameText;
        this.about = data.about;
        this.aboutText = data.aboutText;
        // construct related
        for (var _i = 0, _a = data.articles; _i < _a.length; _i++) {
            var articleData = _a[_i];
            this.articles.push(new Article(articleData));
        }
    }
    Publication.prototype.data = function () {
        return {
            name: this.name,
            about: this.about,
        };
    };
    Publication.prototype.isValid = function () {
        return true;
    };
    return Publication;
}(Resource));
var Article = (function (_super) {
    __extends(Article, _super);
    function Article(data) {
        _super.call(this, data);
        this.title = data.title;
        this.titleText = data.titleText;
        this.body = data.body;
        this.bodyText = data.bodyText;
    }
    Article.prototype.data = function () {
        return {};
    };
    Article.prototype.isValid = function () {
        return true;
    };
    return Article;
}(Resource));
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/models.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_graphql_tag__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_graphql_tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__(182);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BackendService = (function () {
    function BackendService(http, apollo, ui) {
        //this.epLogin('xxhoff@hoff.com', 'hoffi')
        this.http = http;
        this.apollo = apollo;
        this.ui = ui;
        this.backendHost = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].backend;
        this.backendDelay = 0;
        this.fragments = {
            account: (_a = ["\n      fragment account on AccountSchema {\n        email\n        verified\n        authenticated\n        jwt\n\n        authors {\n          id\n          name\n          about\n          imageURL\n          publications {\n            id\n            name\n            about\n            imageURL\n            author {\n              id\n              name\n            }\n            articles {\n              id\n              title\n              bodyOps\n              publication {\n                id\n                name\n                imageURL\n                author {\n                  id\n                  name\n                  imageURL\n                }\n              }\n            }\n          }\n        }\n      }\n    "], _a.raw = ["\n      fragment account on AccountSchema {\n        email\n        verified\n        authenticated\n        jwt\n\n        authors {\n          id\n          name\n          about\n          imageURL\n          publications {\n            id\n            name\n            about\n            imageURL\n            author {\n              id\n              name\n            }\n            articles {\n              id\n              title\n              bodyOps\n              publication {\n                id\n                name\n                imageURL\n                author {\n                  id\n                  name\n                  imageURL\n                }\n              }\n            }\n          }\n        }\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a)),
            info: (_b = ["\n      fragment info on InfoSchema {\n        success\n        message\n      }\n    "], _b.raw = ["\n      fragment info on InfoSchema {\n        success\n        message\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_b)),
            author: (_c = ["\n      fragment author on AuthorSchema {\n        id\n        name\n        about\n        imageURL\n      }\n    "], _c.raw = ["\n      fragment author on AuthorSchema {\n        id\n        name\n        about\n        imageURL\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_c)),
            publication: (_d = ["\n      fragment publication on PublicationSchema {\n        id\n        name\n        about\n        imageURL\n      }\n    "], _d.raw = ["\n      fragment publication on PublicationSchema {\n        id\n        name\n        about\n        imageURL\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_d)),
            article: (_e = ["\n      fragment article on ArticleSchema {\n        id\n        title\n      }\n    "], _e.raw = ["\n      fragment article on ArticleSchema {\n        id\n        title\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_e))
        };
        var jwt = localStorage.getItem('jwt');
        if (!jwt) {
            console.log('no jwt in local storage! not signed in!');
        }
        else {
            this.jwtLogin().subscribe(function (info) {
                console.log('jwt reply', info);
                // we don't care about the response here
            }, function (error) {
                console.warn(error);
            });
            this.loadImages(jwt);
        }
        var _a, _b, _c, _d, _e;
    }
    /** Load User Images */
    BackendService.prototype.loadImages = function (jwt) {
        var _this = this;
        var query = (_a = ["\n      {images(jwt:\"", "\"){\n        url\n        id\n      }}\n    "], _a.raw = ["\n      {images(jwt:\"", "\"){\n        url\n        id\n      }}\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, jwt));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            forceFetch: true
        });
        apolloQuery.subscribe(function (result) {
            _this.userImages = JSON.parse(JSON.stringify(result.data.images));
        });
        var _a;
    };
    /**
     * Email / Password Login
     */
    BackendService.prototype.epLogin = function (email, password) {
        var _this = this;
        var endpoint = 'epLogin';
        var query = (_a = ["\n      {\n        ", " {\n          info {\n            ...info\n          }\n          account {\n            ...account\n          }\n        }\n      }\n      ", "\n      ", "\n    "], _a.raw = ["\n      {\n        ", " {\n          info {\n            ...info\n          }\n          account {\n            ...account\n          }\n        }\n      }\n      ", "\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, endpoint, this.fragments.account, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                email: email,
                password: password,
            },
            forceFetch: true
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.delay(_this.backendDelay).subscribe(function (result) {
                var info = result.data[endpoint].info;
                if (info.success) {
                    var account = result.data[endpoint].account;
                    //this.userAccount = account
                    _this.userAccount = Object.assign({}, account);
                    console.log('user account is now', _this.userAccount);
                    localStorage.setItem('jwt', account.jwt);
                }
                // in any case return the info!
                stream.next(info);
            });
        });
        var _a;
    };
    /**
     * Verify and email with token (usually by following email link)
     */
    BackendService.prototype.verifyEmail = function (email, token) {
        var _this = this;
        var query = (_a = ["\n      {verifyEmail(email:\"", "\", token:\"", "\"){\n        info {...info}\n        account {...account}\n      }}\n      ", "\n      ", "\n    "], _a.raw = ["\n      {verifyEmail(email:\"", "\", token:\"", "\"){\n        info {...info}\n        account {...account}\n      }}\n      ", "\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, email, token, this.fragments.account, this.fragments.info));
        var querySub = this.apollo.watchQuery({
            query: query,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            querySub.delay(_this.backendDelay).subscribe(function (result) {
                var account = result.data.verifyEmail; // this contains all listed in fragment
                _this.userAccount = account;
                // duplicate with jwt and all...
                _this.userAccount = JSON.parse(JSON.stringify(account));
                stream.next(account);
            }, function (error) {
                alert('apollo query error: verify email');
                stream.error('error verifying account');
            });
        });
        var _a;
    };
    BackendService.prototype.logoutUser = function () {
        localStorage.removeItem('jwt');
        this.userAccount = {
            authenticated: false,
            verified: false,
            email: '',
            authors: [],
        };
    };
    /**
     * Authentication with jwt token from localStorage
     */
    BackendService.prototype.jwtLogin = function () {
        var _this = this;
        console.log('attempting jwt login');
        var endpoint = 'jwtLogin';
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n    {jwtLogin(jwt: \"", "\") {\n      info {\n          ...info\n        }\n        account {\n          ...account\n        }\n    }}\n    ", "\n    ", "\n    "], _a.raw = ["\n    {jwtLogin(jwt: \"", "\") {\n      info {\n          ...info\n        }\n        account {\n          ...account\n        }\n    }}\n    ", "\n    ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, jwt, this.fragments.account, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.delay(_this.backendDelay).subscribe(function (result) {
                var info = result.data[endpoint].info;
                if (info.success) {
                    /* include authors! and all the other things! */
                    var account = result.data[endpoint].account;
                    // duplicate in epLogin and all...
                    _this.userAccount = JSON.parse(JSON.stringify(account));
                    localStorage.setItem('jwt', account.jwt);
                }
                // in any case return the info!
                stream.next(info);
            });
        });
        var _a;
    };
    BackendService.prototype.test = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            var query = (_a = ["{test}"], _a.raw = ["{test}"], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a));
            var wq = _this.apollo.query({ query: query, forceFetch: true });
            wq.subscribe(function (result) {
                console.log(result.data);
            });
            var _a;
        }).subscribe(function (jo) { return; });
    };
    /**
     * ACCOUNT CREATION with email and password
     * If successful, returns an iAccount, and also sets it as the userAccount
     */
    BackendService.prototype.createAccount = function (email, password) {
        var _this = this;
        //alert('backend create account call starting')
        var endpoint = 'createAccount';
        var query = (_a = ["\n    {", " {\n        info {\n            ...info\n          }\n          account {\n            ...account\n          }\n    }}\n    ", "\n    ", "\n    "], _a.raw = ["\n    {", " {\n        info {\n            ...info\n          }\n          account {\n            ...account\n          }\n    }}\n    ", "\n    ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, endpoint, this.fragments.account, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                email: email,
                password: password,
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.delay(_this.backendDelay).subscribe(function (result) {
                var info = result.data[endpoint].info;
                if (info.success) {
                    var account = result.data[endpoint].account;
                    _this.userAccount = account;
                    localStorage.setItem('jwt', account.jwt);
                }
                // in any case return the info!
                stream.next(info);
            }, 
            // un-expected Backend error
            function (error) {
                stream.error('un-expected backend error');
            });
        });
        var _a;
    };
    /** new kid */
    BackendService.prototype.saveAuthor = function (author) {
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n      {saveAuthor {\n        info {\n          ...info\n        }\n        author {\n          id\n        }\n      }}\n      ", "\n    "], _a.raw = ["\n      {saveAuthor {\n        info {\n          ...info\n        }\n        author {\n          id\n        }\n      }}\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                jwt: jwt,
                authorID: author.id,
                name: author.name,
                about: author.about,
                imageURL: author.imageURL
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                console.log('backend saved author, result', result);
                stream.next(result.data.saveAuthor);
            });
        });
        var _a;
    };
    /** GET OR LOAD AUTHOR */
    BackendService.prototype.getAuthor = function (authorID) {
        // check locally: ToDo!
        var query = (_a = ["\n      {author {\n        id, name, about, imageURL\n      }}\n    "], _a.raw = ["\n      {author {\n        id, name, about, imageURL\n      }}\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a));
        var querySubscription = this.apollo.watchQuery({
            query: query,
            variables: {
                authorID: authorID,
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            querySubscription.subscribe(function (result) {
                var author = result.data.author;
                stream.next(author);
            }, function (error) {
                stream.error('error getting author');
            });
        });
        var _a;
    };
    BackendService.prototype.deleteAuthor = function (authorID) {
        var _this = this;
        /**
         * Deletes an Author, removes it from the userAccount's authors,
         * and returns information about the status
         */
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n      {deleteAuthor(jwt:\"", "\", authorID: \"", "\"){\n        ...info\n      }}\n      ", "\n    "], _a.raw = ["\n      {deleteAuthor(jwt:\"", "\", authorID: \"", "\"){\n        ...info\n      }}\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, jwt, authorID, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                var info = result.data.deleteAuthor;
                var authors = _this.userAccount.authors;
                if (info.success) {
                    // remove author from userAccount's authors
                    authors = authors.filter(function (author) { return author.id !== authorID; });
                    _this.userAccount.authors = authors;
                }
                stream.next(info);
            });
        });
        var _a;
    };
    /**
     * GET a single Publication, from cache or backend
     */
    BackendService.prototype.getPublication = function (authorID, publicationID) {
        var query = (_a = ["\n        {publication {\n          id\n          name\n          about\n          imageURL\n          author {\n            id\n            name\n            about\n            imageURL\n          }\n          articles {\n            id\n            title\n            bodyOps\n            publication {\n              id\n              name\n              author {\n                name\n                id\n              }\n            }\n          }\n        }}\n      "], _a.raw = ["\n        {publication {\n          id\n          name\n          about\n          imageURL\n          author {\n            id\n            name\n            about\n            imageURL\n          }\n          articles {\n            id\n            title\n            bodyOps\n            publication {\n              id\n              name\n              author {\n                name\n                id\n              }\n            }\n          }\n        }}\n      "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a));
        var querySubscription = this.apollo.watchQuery({
            query: query,
            variables: {
                authorID: authorID,
                publicationID: publicationID
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            querySubscription.subscribe(function (result) {
                var publication = result.data.publication;
                stream.next(publication);
            }, function (error) {
                stream.error('error getting publication');
            });
        });
        var _a;
    };
    /**
     * SAVE PUBLICATION (new or existing)
     */
    BackendService.prototype.savePublication = function (publication) {
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n      {\n       savePublication {\n          publication {\n            ...publication\n            author {\n              ...author\n            }\n          }\n          info {\n            ...info\n          }\n        }\n      }\n      ", "\n      ", "\n      ", "\n    "], _a.raw = ["\n      {\n       savePublication {\n          publication {\n            ...publication\n            author {\n              ...author\n            }\n          }\n          info {\n            ...info\n          }\n        }\n      }\n      ", "\n      ", "\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, this.fragments.info, this.fragments.publication, this.fragments.author));
        var querySubscription = this.apollo.watchQuery({
            query: query,
            variables: {
                jwt: jwt,
                authorID: publication.author.id,
                publicationID: publication.id,
                name: publication.name,
                about: publication.about,
                imageURL: publication.imageURL,
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            querySubscription.subscribe(function (result) {
                var publication = result.data.savePublication.publication;
                var info = result.data.savePublication.info;
                // pass back the whole response
                stream.next(result.data.savePublication);
            }, function (error) {
                stream.error('error saving publication');
            });
        });
        var _a;
    };
    /**
     * SAVE ARTICLE - create new / update existing!
     */
    BackendService.prototype.saveArticle = function (authorID, publicationID, articleID, article) {
        console.log('save article', article);
        var jwt = localStorage.getItem('jwt');
        var endpoint = 'saveArticle';
        var query = (_a = ["\n      {\n        ", " {\n          info {\n            ...info\n          }\n          article {\n            ...article\n            publication {\n              ...publication\n              author {\n                ...author\n              }\n            }\n          }\n        }\n      }\n      ", "\n      ", "\n      ", "\n      ", "\n    "], _a.raw = ["\n      {\n        ", " {\n          info {\n            ...info\n          }\n          article {\n            ...article\n            publication {\n              ...publication\n              author {\n                ...author\n              }\n            }\n          }\n        }\n      }\n      ", "\n      ", "\n      ", "\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, endpoint, this.fragments.article, this.fragments.publication, this.fragments.author, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                jwt: jwt,
                authorID: authorID,
                publicationID: publicationID,
                articleID: articleID,
                title: article.title,
                bodyOps: article.bodyOps
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                var article = result.data[endpoint].article;
                var info = result.data[endpoint].info;
                var reply = result.data[endpoint];
                console.log('backend saved article, result', result);
                stream.next(reply);
            });
        });
        var _a;
    };
    BackendService.prototype.deleteArticle = function (article) {
        console.log(article);
        console.log('be delete', article);
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n      {deleteArticle {\n         ...info\n      }}\n       ", "\n    "], _a.raw = ["\n      {deleteArticle {\n         ...info\n      }}\n       ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                jwt: jwt,
                authorID: article.publication.author.id,
                publicationID: article.publication.id,
                articleID: article.id
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                var info = result.data.deleteArticle;
                stream.next(info);
            });
        });
        var _a;
    };
    BackendService.prototype.getArticle = function (authorID, publicationID, articleID) {
        /** now, we load the path up to author. */
        var query = (_a = ["\n      {article {\n        id\n        title\n        bodyOps\n        publication {\n          id\n          name\n          about\n          imageURL\n          author {\n            id\n            name\n            about\n            imageURL\n          }\n        }\n      }}\n    "], _a.raw = ["\n      {article {\n        id\n        title\n        bodyOps\n        publication {\n          id\n          name\n          about\n          imageURL\n          author {\n            id\n            name\n            about\n            imageURL\n          }\n        }\n      }}\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                authorID: authorID,
                publicationID: publicationID,
                articleID: articleID,
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                console.log('get article result', result);
                stream.next(result.data.article);
            });
        });
        var _a;
    };
    BackendService.prototype.deletePublication = function (publication) {
        var _this = this;
        /**
         * Deletes a publication, removes it from the respetive's userAccount's author's publications TODO,
         * and returns information about the status
         */
        var jwt = localStorage.getItem('jwt');
        var query = (_a = ["\n      {deletePublication {\n        ...info\n      }}\n      ", "\n    "], _a.raw = ["\n      {deletePublication {\n        ...info\n      }}\n      ", "\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, this.fragments.info));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            variables: {
                jwt: jwt,
                authorID: publication.author.id,
                publicationID: publication.id,
            },
            forceFetch: true,
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                var info = result.data.deletePublication;
                var authors = _this.userAccount.authors;
                if (info.success) {
                }
                stream.next(info);
            });
        });
        var _a;
    };
    /**
     * IMAGE UPLOAD
     */
    BackendService.prototype.uploadFile = function (file) {
        var _this = this;
        var jwt = localStorage.getItem('jwt');
        if (!jwt) {
            alert('no jwt in upload file handler! ui needs to prevent this');
            return;
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (progressStream) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            // uploads[] is how we pick things up in the backend
            formData.append('uploads[]', file, file.name);
            formData.append('jwt', jwt);
            /** on progress, push to stream! */
            xhr.addEventListener('progress', function (event) {
                var percent = Math.ceil((event.loaded / event.total) * 100);
                progressStream.next(percent);
            });
            /** listen to a success message from the server */
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var imageInfo = JSON.parse(xhr.response);
                        progressStream.next(100);
                        //progressStream.next(JSON.parse(xhr.response));
                        progressStream.complete(); // next would also be an option...
                        // we should pass the server response down stream!
                        console.log('wanna add', imageInfo);
                        _this.userImages.unshift(imageInfo);
                    }
                    else {
                        // on error - what do they look like?
                        progressStream.error(xhr.response);
                    }
                }
            };
            // request an upload URL, then kick off upload!
            _this.http.get(_this.backendHost + '/image/upload-url').map(function (res) { return res.json(); }).subscribe(function (data) {
                xhr.open('POST', data.url, true);
                xhr.send(formData);
            });
        });
    };
    BackendService.prototype.deleteImage = function (id) {
        var query = (_a = ["\n      {\n        deleteImage(id: \"", "\") {\n          message\n        }\n      }\n    "], _a.raw = ["\n      {\n        deleteImage(id: \"", "\") {\n          message\n        }\n      }\n    "], __WEBPACK_IMPORTED_MODULE_4_graphql_tag___default()(_a, id));
        var apolloQuery = this.apollo.watchQuery({
            query: query,
            forceFetch: true
        });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            apolloQuery.subscribe(function (result) {
                stream.next(result.data.deleteImage.message);
                alert(result.data.deleteImage.message);
            });
        }).subscribe();
        var _a;
    };
    /**
     * Creates a resource, via PUT
     */
    BackendService.prototype.putResource = function (resource) {
        if (resource.isValid()) {
            // go ahead and PUT
            return this.http.put(resource.url, resource.data(), this.defaultOptions()).map(function (res) { return res.json(); });
        }
        else {
            // return validation error, via subscription
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (input) { input.error({ status: 999 }); });
        }
    };
    /**
     * Updates a resource, via POST
     */
    BackendService.prototype.postResource = function (resource) {
        if (resource.isValid()) {
            // go ahead and POST
            return this.http.post(resource.url, resource.data(), this.defaultOptions()).map(function (res) { return res.json(); });
        }
        else {
            // return validation error, via subscription
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (input) { input.error({ status: 999 }); });
        }
    };
    /**
     * Deletes a resource, via DELETE
     */
    BackendService.prototype.deleteResource = function (resource) {
        return this.http.delete(resource.url, this.defaultOptions()).map(function (res) { return res.json(); });
    };
    /**
     * Gets a resource, given its IDs
     * -authorID (required)
     * -publicationID
     * -articleID
     */
    BackendService.prototype.getResourceByIDs = function (authorID, publicationID, articleID) {
        var url = this.backendHost + '/author/' + authorID;
        url += publicationID ? "/publication/" + publicationID : '';
        url += articleID ? "/article/" + articleID : '';
        return this.http.get(url, this.defaultOptions()).map(function (res) { return res.json(); });
    };
    /**
     * Gets a resource from a given URL
     */
    BackendService.prototype.getResourceByUrl = function (url) {
        return this.http.get(url, this.defaultOptions()).map(function (res) { return res.json(); });
    };
    /**
     * Gets a list of resource from a given URL
     */
    BackendService.prototype.getResourcesByUrl = function (url) {
        return this.http.get(url, this.defaultOptions()).map(function (res) { return res.json(); });
    };
    /**
     * Returns RequestOptions of content-type: json, withCredentials: true
     */
    BackendService.prototype.defaultOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers, withCredentials: true });
    };
    BackendService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_apollo_angular__["b" /* Apollo */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */]) === 'function' && _c) || Object])
    ], BackendService);
    return BackendService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/backend.service.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UIService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UIService = (function () {
    function UIService(sanitizer) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.colors = {
            black: '#000',
            white: '#fff',
            lightblue: 'lightblue',
            lightgreen: 'lightgreen',
            lightred: '#c58a68',
            lightyellow: 'lightyellow',
            lightgray: 'lightgray',
            debug: false,
        };
        this.bg = {
            hero1: 'url'
        };
        this.endlessBG = "background-color: #1a1a1a;";
        this.endless = "url(\"data:image/svg+xml,%3Csvg width='56' height='28' viewBox='0 0 56 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M56 26c-2.813 0-5.456.726-7.752 2H56v-2zm-26 2h4.087C38.707 20.783 46.795 16 56 16v-2c-.672 0-1.339.024-1.999.07L54 14a2 2 0 0 1 2-2v-2a4 4 0 0 0-3.98 3.602 28.087 28.087 0 0 0-2.793-3.862A7.994 7.994 0 0 1 56 6V4a9.988 9.988 0 0 0-8.17 4.232 28.156 28.156 0 0 0-3.03-2.634A13.979 13.979 0 0 1 56 0h-7.752a16.078 16.078 0 0 0-5.09 4.454 27.941 27.941 0 0 0-3.536-1.936c.63-.896 1.33-1.738 2.095-2.518H39.03c-.46.557-.893 1.137-1.297 1.737A27.787 27.787 0 0 0 33.723.585c.12-.196.24-.392.364-.585H30l-.001.07A28.406 28.406 0 0 0 26 .07L26 0h-4.087c.124.193.245.389.364.585a27.787 27.787 0 0 0-4.009 1.152c-.404-.6-.837-1.18-1.297-1.737h-2.688c.764.78 1.466 1.622 2.095 2.518-1.23.562-2.41 1.21-3.536 1.936A16.078 16.078 0 0 0 7.752 0H0c4.58 0 8.645 2.199 11.2 5.598a28.156 28.156 0 0 0-3.03 2.634A9.988 9.988 0 0 0 0 4v2a7.994 7.994 0 0 1 6.773 3.74 28.087 28.087 0 0 0-2.793 3.862A4 4 0 0 0 0 10v2a2 2 0 0 1 1.999 2.07C1.339 14.024.672 14 0 14v2c9.205 0 17.292 4.783 21.913 12H26a2 2 0 1 1 4 0zM7.752 28C5.456 26.726 2.812 26 0 26v2h7.752zM56 20c-6.832 0-12.936 3.114-16.971 8h2.688A19.94 19.94 0 0 1 56 22v-2zm-39.029 8C12.936 23.114 6.831 20 0 20v2a19.94 19.94 0 0 1 14.283 6h2.688zm15.01-.398a28.087 28.087 0 0 1 2.792-3.862A7.994 7.994 0 0 0 28 20a7.994 7.994 0 0 0-6.773 3.74 28.087 28.087 0 0 1 2.793 3.862 4 4 0 0 1 7.96 0zm14.287-11.865C42.318 9.864 35.61 6 28 6c-7.61 0-14.318 3.864-18.268 9.737a27.787 27.787 0 0 0-4.009-1.152C10.275 7.043 18.548 2 28 2c9.452 0 17.725 5.043 22.277 12.585a27.787 27.787 0 0 0-4.009 1.152zm-5.426 2.717a27.941 27.941 0 0 1 3.536-1.936C40.76 11.367 34.773 8 28 8s-12.76 3.367-16.378 8.518c1.23.562 2.41 1.21 3.536 1.936C18.075 14.537 22.741 12 28 12s9.925 2.537 12.842 6.454zm-4.672 3.778a28.156 28.156 0 0 1 3.03-2.634A13.979 13.979 0 0 0 28 14c-4.58 0-8.645 2.199-11.2 5.598a28.156 28.156 0 0 1 3.03 2.634A9.988 9.988 0 0 1 28 18a9.988 9.988 0 0 1 8.17 4.232z' fill='%23fffffb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")\n  ";
        this.url = "data:image/svg+xml,%3Csvg width='56' height='28' viewBox='0 0 56 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M56 26c-2.813 0-5.456.726-7.752 2H56v-2zm-26 2h4.087C38.707 20.783 46.795 16 56 16v-2c-.672 0-1.339.024-1.999.07L54 14a2 2 0 0 1 2-2v-2a4 4 0 0 0-3.98 3.602 28.087 28.087 0 0 0-2.793-3.862A7.994 7.994 0 0 1 56 6V4a9.988 9.988 0 0 0-8.17 4.232 28.156 28.156 0 0 0-3.03-2.634A13.979 13.979 0 0 1 56 0h-7.752a16.078 16.078 0 0 0-5.09 4.454 27.941 27.941 0 0 0-3.536-1.936c.63-.896 1.33-1.738 2.095-2.518H39.03c-.46.557-.893 1.137-1.297 1.737A27.787 27.787 0 0 0 33.723.585c.12-.196.24-.392.364-.585H30l-.001.07A28.406 28.406 0 0 0 26 .07L26 0h-4.087c.124.193.245.389.364.585a27.787 27.787 0 0 0-4.009 1.152c-.404-.6-.837-1.18-1.297-1.737h-2.688c.764.78 1.466 1.622 2.095 2.518-1.23.562-2.41 1.21-3.536 1.936A16.078 16.078 0 0 0 7.752 0H0c4.58 0 8.645 2.199 11.2 5.598a28.156 28.156 0 0 0-3.03 2.634A9.988 9.988 0 0 0 0 4v2a7.994 7.994 0 0 1 6.773 3.74 28.087 28.087 0 0 0-2.793 3.862A4 4 0 0 0 0 10v2a2 2 0 0 1 1.999 2.07C1.339 14.024.672 14 0 14v2c9.205 0 17.292 4.783 21.913 12H26a2 2 0 1 1 4 0zM7.752 28C5.456 26.726 2.812 26 0 26v2h7.752zM56 20c-6.832 0-12.936 3.114-16.971 8h2.688A19.94 19.94 0 0 1 56 22v-2zm-39.029 8C12.936 23.114 6.831 20 0 20v2a19.94 19.94 0 0 1 14.283 6h2.688zm15.01-.398a28.087 28.087 0 0 1 2.792-3.862A7.994 7.994 0 0 0 28 20a7.994 7.994 0 0 0-6.773 3.74 28.087 28.087 0 0 1 2.793 3.862 4 4 0 0 1 7.96 0zm14.287-11.865C42.318 9.864 35.61 6 28 6c-7.61 0-14.318 3.864-18.268 9.737a27.787 27.787 0 0 0-4.009-1.152C10.275 7.043 18.548 2 28 2c9.452 0 17.725 5.043 22.277 12.585a27.787 27.787 0 0 0-4.009 1.152zm-5.426 2.717a27.941 27.941 0 0 1 3.536-1.936C40.76 11.367 34.773 8 28 8s-12.76 3.367-16.378 8.518c1.23.562 2.41 1.21 3.536 1.936C18.075 14.537 22.741 12 28 12s9.925 2.537 12.842 6.454zm-4.672 3.778a28.156 28.156 0 0 1 3.03-2.634A13.979 13.979 0 0 0 28 14c-4.58 0-8.645 2.199-11.2 5.598a28.156 28.156 0 0 1 3.03 2.634A9.988 9.988 0 0 1 28 18a9.988 9.988 0 0 1 8.17 4.232z' fill='%23fffffb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E";
        this.trustedBG = this.sanitizer.bypassSecurityTrustResourceUrl(this.endless);
        this.trustedURL = this.sanitizer.bypassSecurityTrustUrl(this.url);
        this.pad = 30;
        this.style = {
            'background-image': "url(" + this.trustedURL + ")",
            'background-color': 'black',
        };
        this.mediaBar = false;
        // keyboard shortcuts
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'keydown').subscribe(function (event) {
            //console.log(event.keyCode)
            // toggle media bar
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 77) {
                _this.mediaBar = !_this.mediaBar;
                event.preventDefault();
            }
        });
        this.mediaClickObservable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (stream) {
            _this.mediaClickStream = stream;
        }).share();
        this.mediaClickObservable.subscribe(function (image) {
            console.log('media bar image clicked', image);
        });
    }
    UIService.prototype.handleError = function (error) {
        console.log(error);
        alert('error: ' + error.status);
    };
    UIService.prototype.flashMessage = function (message) {
        var _this = this;
        this.message = message;
        setTimeout(function () { _this.message = ''; }, 1000);
    };
    UIService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], UIService);
    return UIService;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/ui.service.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArticleComponent = (function () {
    function ArticleComponent(ui) {
        this.ui = ui;
        this.editable = false;
        this.preview = false;
    }
    ArticleComponent.prototype.ngOnInit = function () {
        /* check your input */
        if (!this.article.publication || !this.article.publication.author) {
            alert('inputs fucked');
        }
        this.makeQuill();
        this.ui.mediaClickObservable.subscribe(function (image) {
            //this.insertImage(image.url + '&w=700')
        });
    };
    ArticleComponent.prototype.makeQuill = function () {
        var _this = this;
        var modules;
        if (this.editable) {
            console.log('editbale article!');
            modules = {
                toolbar: {
                    container: document.getElementById('toolbar'),
                },
            };
        }
        else {
            console.log('making quill with hidden toolbar', this.hidden.nativeElement);
            modules = {
                toolbar: {
                    container: this.hidden.nativeElement,
                },
            };
        }
        this.quill = new Quill(this.editor.nativeElement, {
            modules: modules,
            theme: 'snow',
            placeholder: 'here is where you lay your words down...',
        });
        var ops;
        try {
            ops = JSON.parse(this.article.bodyOps);
            if (this.preview) {
                var OpsObs = ops.ops.slice(0, 5);
                ops.ops = OpsObs;
            }
        }
        catch (e) {
            console.log('error parsing json, this is the offender:', this.article.bodyOps);
            ops = { "ops": [{ "insert": "error parsing json\n" }] };
        }
        this.quill.setContents(ops);
        if (!this.editable) {
            this.quill.disable();
        }
        this.quill.on('text-change', function (delta, oldDelta, source) {
            /*
            keep the article bodyOps property in sync, for saving.
            */
            _this.article.bodyOps = JSON.stringify(_this.quill.getContents());
            _this.lastRange = _this.quill.getSelection();
        });
    };
    ArticleComponent.prototype.insertImage = function (url) {
        this.quill.insertEmbed(this.lastRange.index, 'image', url, 'user');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models__["iArticle"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models__["iArticle"]) === 'function' && _a) || Object)
    ], ArticleComponent.prototype, "article", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], ArticleComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], ArticleComponent.prototype, "preview", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('editor'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _b) || Object)
    ], ArticleComponent.prototype, "editor", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('hidden'), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _c) || Object)
    ], ArticleComponent.prototype, "hidden", void 0);
    ArticleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-article',
            template: __webpack_require__(814),
            styles: [__webpack_require__(799)]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */]) === 'function' && _d) || Object])
    ], ArticleComponent);
    return ArticleComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/article.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 473;


/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(592);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/main.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountPageComponent = (function () {
    function AccountPageComponent(backend) {
        this.backend = backend;
    }
    AccountPageComponent.prototype.ngOnInit = function () {
        // force reload of data
        this.backend.jwtLogin().subscribe();
    };
    AccountPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-account-page',
            template: __webpack_require__(811),
            styles: [__webpack_require__(796)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], AccountPageComponent);
    return AccountPageComponent;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/account-page.component.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = (function () {
    function AppComponent(backend, ui) {
        var _this = this;
        this.backend = backend;
        this.ui = ui;
        var now = new Date().getTime();
        stopTimer(now);
        this.public = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].public;
        console.log('app environment', __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */]);
        // observe keyboard
        __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].fromEvent(window, 'keydown').subscribe(function (event) {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 27) {
                // cmd + escape
                _this.public = !_this.public;
                event.preventDefault();
            }
        });
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(812),
            styles: [__webpack_require__(797)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/app.component.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__author_author_component__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__slugify_pipe__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stringify_pipe__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__author_page_author_page_component__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_page_home_page_component__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__publication_page_publication_page_component__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__article_page_article_page_component__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__publication_publication_component__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__article_article_component__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_apollo_client__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__auth_page_auth_page_component__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__email_verification_page_email_verification_page_component__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__me_page_me_page_component__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__layout_layout_component__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__account_page_account_page_component__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__bottom_bar_bottom_bar_component__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__file_drop_file_drop_component__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__autosize_directive__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__media_page_media_page_component__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__environments_environment__ = __webpack_require__(182);
/* unused harmony export provideClient */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





























var apolloClient = new __WEBPACK_IMPORTED_MODULE_17_apollo_client__["a" /* ApolloClient */]({
    networkInterface: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17_apollo_client__["b" /* createNetworkInterface */])({
        uri: __WEBPACK_IMPORTED_MODULE_28__environments_environment__["a" /* environment */].backend + '/graphql'
    }),
});
function provideClient() {
    return apolloClient;
}
var appRoutes = [
    //{ path: '', component: LayoutComponent },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_12__home_page_home_page_component__["a" /* HomePageComponent */] },
    // pages
    //{ path: 'me', component: MePageComponent},
    { path: 'my-account', component: __WEBPACK_IMPORTED_MODULE_23__account_page_account_page_component__["a" /* AccountPageComponent */] },
    { path: 'my-media', component: __WEBPACK_IMPORTED_MODULE_27__media_page_media_page_component__["a" /* MediaPageComponent */] },
    { path: 'auth', component: __WEBPACK_IMPORTED_MODULE_19__auth_page_auth_page_component__["a" /* AuthPageComponent */] },
    { path: 'verify/:email/:token', component: __WEBPACK_IMPORTED_MODULE_20__email_verification_page_email_verification_page_component__["a" /* EmailVerificationPageComponent */] },
    // graph
    { path: ':authorID', component: __WEBPACK_IMPORTED_MODULE_11__author_page_author_page_component__["a" /* AuthorPageComponent */] },
    { path: ':authorID/:publicationID', component: __WEBPACK_IMPORTED_MODULE_13__publication_page_publication_page_component__["a" /* PublicationPageComponent */] },
    { path: ':authorID/:publicationID/:articleID', component: __WEBPACK_IMPORTED_MODULE_14__article_page_article_page_component__["a" /* ArticlePageComponent */] },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__author_author_component__["a" /* AuthorComponent */],
                __WEBPACK_IMPORTED_MODULE_8__slugify_pipe__["a" /* SlugifyPipe */],
                __WEBPACK_IMPORTED_MODULE_9__stringify_pipe__["a" /* StringifyPipe */],
                __WEBPACK_IMPORTED_MODULE_11__author_page_author_page_component__["a" /* AuthorPageComponent */],
                __WEBPACK_IMPORTED_MODULE_12__home_page_home_page_component__["a" /* HomePageComponent */],
                __WEBPACK_IMPORTED_MODULE_13__publication_page_publication_page_component__["a" /* PublicationPageComponent */],
                __WEBPACK_IMPORTED_MODULE_14__article_page_article_page_component__["a" /* ArticlePageComponent */],
                __WEBPACK_IMPORTED_MODULE_15__publication_publication_component__["a" /* PublicationComponent */],
                __WEBPACK_IMPORTED_MODULE_16__article_article_component__["a" /* ArticleComponent */],
                __WEBPACK_IMPORTED_MODULE_19__auth_page_auth_page_component__["a" /* AuthPageComponent */],
                __WEBPACK_IMPORTED_MODULE_20__email_verification_page_email_verification_page_component__["a" /* EmailVerificationPageComponent */],
                __WEBPACK_IMPORTED_MODULE_21__me_page_me_page_component__["a" /* MePageComponent */],
                __WEBPACK_IMPORTED_MODULE_22__layout_layout_component__["a" /* LayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_23__account_page_account_page_component__["a" /* AccountPageComponent */],
                __WEBPACK_IMPORTED_MODULE_24__bottom_bar_bottom_bar_component__["a" /* BottomBarComponent */],
                __WEBPACK_IMPORTED_MODULE_25__file_drop_file_drop_component__["a" /* FileDropComponent */],
                __WEBPACK_IMPORTED_MODULE_26__autosize_directive__["a" /* AutosizeDirective */],
                __WEBPACK_IMPORTED_MODULE_27__media_page_media_page_component__["a" /* MediaPageComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_18_apollo_angular__["a" /* ApolloModule */].forRoot(provideClient),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__backend_service__["a" /* BackendService */], __WEBPACK_IMPORTED_MODULE_10__ui_service__["a" /* UIService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/app.module.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__article_article_component__ = __webpack_require__(384);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ArticlePageComponent = (function () {
    function ArticlePageComponent(route, router, backend, apollo, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.apollo = apollo;
        this.ui = ui;
        console.log('article page constructed');
        // keyboard shortcuts
        this.keyboardSubscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'keydown').subscribe(function (event) {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
                // cmd + s
                _this.saveArticle();
                event.preventDefault();
            }
            else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
                // cmd + d
                _this.deleteArticle();
                event.preventDefault();
            }
        });
    }
    ArticlePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to media clicks
        this.ui.mediaClickObservable.subscribe(function (image) {
            _this.articleCmp.insertImage(image.url + '&w=600');
        });
        // get route params
        this.route.params.subscribe(function (params) {
            _this.authorID = params['authorID'];
            _this.publicationID = params['publicationID'];
            _this.articleID = params['articleID'];
            if (_this.articleID === 'create-article') {
                _this.backend.getPublication(_this.authorID, _this.publicationID).subscribe(function (pub) {
                    _this.article = {
                        id: 'create-article',
                        title: 'no title yet',
                        bodyOps: '{}',
                        publication: JSON.parse(JSON.stringify(pub))
                    };
                });
            }
            else {
                _this.backend.getArticle(_this.authorID, _this.publicationID, _this.articleID).subscribe(function (article) {
                    _this.article = JSON.parse(JSON.stringify(article));
                });
            }
        });
    };
    /**
     * Creates a new article, or updates an exisiting one
     */
    ArticlePageComponent.prototype.saveArticle = function () {
        var _this = this;
        this.backend.saveArticle(this.authorID, this.publicationID, this.articleID, this.article).subscribe(function (reply) {
            _this.ui.flashMessage(reply.info.message);
            // in case of create-article, navigate to created article
            _this.router.navigate(['/', reply.article.publication.author.id, reply.article.publication.id, reply.article.id]);
        });
    };
    /**
     * Deletes the article
     */
    ArticlePageComponent.prototype.deleteArticle = function () {
        var _this = this;
        this.backend.deleteArticle(this.article).subscribe(function (info) {
            _this.ui.flashMessage(info.message);
            _this.router.navigate(['/', _this.authorID, _this.publicationID]);
        });
    };
    /**
     * on destroy: unsubscribe from keyboard
     */
    ArticlePageComponent.prototype.ngOnDestroy = function () {
        console.log('article page destroyed');
        this.keyboardSubscription.unsubscribe();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */]), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */]) === 'function' && _a) || Object)
    ], ArticlePageComponent.prototype, "articleCmp", void 0);
    ArticlePageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-article-page',
            template: __webpack_require__(813),
            styles: [__webpack_require__(798)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */]) === 'function' && _f) || Object])
    ], ArticlePageComponent);
    return ArticlePageComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/article-page.component.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthPageComponent = (function () {
    function AuthPageComponent(backend, apollo, fb, ui, router) {
        this.backend = backend;
        this.apollo = apollo;
        this.fb = fb;
        this.ui = ui;
        this.router = router;
        // template bindings 
        this.registerEmail = '';
        this.registerPassword = '';
        this.registrationLoading = false;
        this.loginEmail = '';
        this.loginPassword = '';
        // network status
        this.loginLoading = false;
        this.loginForm = this.fb.group({
            email: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            password: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
        this.registrationForm = this.fb.group({
            email: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            password: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            password2: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            terms: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].requiredTrue],
        });
    }
    /**
     * Try to authenticate with email and password
     * If successfull, the backend's userAccount will be updated
     * In any case, we receive the info (success and msg)
     */
    AuthPageComponent.prototype.doLogin = function (event) {
        var _this = this;
        var email = this.loginForm.value.email;
        var password = this.loginForm.value.password;
        this.loginLoading = true;
        this.backend.epLogin(email, password).subscribe(function (info) {
            _this.loginLoading = false;
            _this.ui.message = info.message;
            if (info.success === true) {
                _this.router.navigate(['/', 'my-account']);
            }
        });
        // we only care about the status. the account is handled by the backend.
    };
    /**
     * Can only be called once the registration form is valid
     * Receives information (success, and message) about the result
     */
    AuthPageComponent.prototype.createAccount = function () {
        var _this = this;
        var email = this.registrationForm.value.email;
        var password = this.registrationForm.value.password;
        this.registrationLoading = true;
        this.backend.createAccount(email, password).subscribe(function (info) {
            _this.registrationLoading = false;
            _this.ui.message = info.message;
            if (info.success === true) {
                _this.router.navigate(['/', 'my-account']);
            }
        });
    };
    AuthPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-auth-page',
            template: __webpack_require__(815),
            styles: [__webpack_require__(800)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_apollo_angular__["b" /* Apollo */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__ui_service__["a" /* UIService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === 'function' && _e) || Object])
    ], AuthPageComponent);
    return AuthPageComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/auth-page.component.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_apollo_angular__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthorPageComponent = (function () {
    function AuthorPageComponent(
        // angular
        route, router, 
        // ink
        backend, ui, 
        // graphql
        apollo) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.ui = ui;
        this.apollo = apollo;
        this.editable = false;
        console.log('author page constructed');
        this.route.params.subscribe(function (params) {
            _this.authorID = params['authorID'];
            if (_this.authorID === 'create-author') {
                _this.editable = true;
                _this.author = {
                    new: true,
                    id: 'create-author',
                    name: '',
                    about: '',
                    imageURL: '/assets/images/mask.png',
                    publications: [],
                };
            }
            else {
                _this.backend.getAuthor(_this.authorID).subscribe(function (author) {
                    _this.author = JSON.parse(JSON.stringify(author));
                });
            }
        });
        // observe keyboard
        this.keyboardSubscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'keydown').subscribe(function (event) {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
                // cmd + s
                _this.saveAuthor();
                event.preventDefault();
            }
            else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
                // cmd + d
                _this.deleteAuthor();
                event.preventDefault();
            }
        });
    }
    /**
     * Deletes the author, and redirects to my-account
     */
    AuthorPageComponent.prototype.deleteAuthor = function () {
        var _this = this;
        this.backend.deleteAuthor(this.authorID).subscribe(function (info) {
            _this.ui.flashMessage(info.message);
            _this.router.navigate(['/my-account']);
        });
    };
    /**
     * The author instance data can get changed by the author component,
     * and trigger an update here
     */
    AuthorPageComponent.prototype.saveAuthor = function () {
        var _this = this;
        console.log('save author');
        this.backend.saveAuthor(this.author).subscribe(function (authorResponse) {
            _this.ui.flashMessage(authorResponse.info.message);
            // in case of create-author, we need to redirect
            _this.router.navigate(['/', authorResponse.author.id]);
            console.log(authorResponse.author.id);
        });
    };
    AuthorPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * On media click, we update the author's image url
         */
        this.ui.mediaClickObservable.subscribe(function (image) {
            _this.author.imageURL = image.url;
        });
    };
    /**
     * Unsubscribe from keyboard events
     */
    AuthorPageComponent.prototype.ngOnDestroy = function () {
        console.log('author page destroyed');
        this.keyboardSubscription.unsubscribe();
    };
    AuthorPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-author-page',
            template: __webpack_require__(816),
            styles: [__webpack_require__(801)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__ui_service__["a" /* UIService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6_apollo_angular__["b" /* Apollo */]) === 'function' && _e) || Object])
    ], AuthorPageComponent);
    return AuthorPageComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/author-page.component.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthorComponent = (function () {
    function AuthorComponent(ui, sanitizer) {
        this.ui = ui;
        this.sanitizer = sanitizer;
        this.editable = false;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]();
        // this output is emitted straight from the template!
        this.create = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]();
        this.imageStyle = {
            boxShadow: this.sanitizer.bypassSecurityTrustStyle('inset 0 1.5px 3px 0 rgba(0,0,0,.15), 0 1.5px 3px 0 rgba(0,0,0,.15)'),
            border: this.size === 'sticker' ? '3px solid green' : '8px solid #fff',
        };
        this.pad = this.size === 'sticker' ? 5 : 20;
    }
    AuthorComponent.prototype.imgStyle = function () {
        if (this.size === 'sticker') {
            return {
                'width.px': 70,
                'height.px': 70,
            };
        }
        else {
            return {
                'width.px': 150,
                'height.px': 150,
            };
        }
    };
    AuthorComponent.prototype.nameStyle = function () {
        if (this.size === 'sticker') {
            return {
                'font-size.px': 14,
                'margin': '5px 0',
                'font-weight': 'bold',
            };
        }
        else {
            return {
                'font-size.px': 50,
                'font-weight': 'bold',
                'margin': '10px 0',
                'border': 0,
                'width.%': 100,
                'textAlign': 'center',
            };
        }
    };
    AuthorComponent.prototype.aboutStyle = function () {
        if (this.size === 'sticker') {
            return {
                'font-size.px': 12,
            };
        }
        else {
            return {
                'font-size.px': 18,
            };
        }
    };
    AuthorComponent.prototype.ngOnInit = function () {
        console.log('author cmp here', this.author);
    };
    AuthorComponent.prototype.ngOnChanges = function () {
        console.log('author cmp input changed', this.author);
    };
    AuthorComponent.prototype.emitSaveAuthor = function () {
        console.log('author cmp emits onSave');
        this.onSave.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models__["iAuthor"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__models__["iAuthor"]) === 'function' && _a) || Object)
    ], AuthorComponent.prototype, "author", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], AuthorComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', String)
    ], AuthorComponent.prototype, "size", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]) === 'function' && _b) || Object)
    ], AuthorComponent.prototype, "onSave", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]) === 'function' && _c) || Object)
    ], AuthorComponent.prototype, "create", void 0);
    AuthorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-author',
            template: __webpack_require__(817),
            styles: [__webpack_require__(802)]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__ui_service__["a" /* UIService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === 'function' && _e) || Object])
    ], AuthorComponent);
    return AuthorComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/author.component.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutosizeDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutosizeDirective = (function () {
    function AutosizeDirective(element) {
        this.element = element;
    }
    AutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeDirective.prototype.ngAfterContentChecked = function () {
        this.adjust();
    };
    AutosizeDirective.prototype.adjust = function () {
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* HostListener */])('input', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AutosizeDirective.prototype, "onInput", null);
    AutosizeDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Directive */])({
            selector: 'textarea[autosize]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object])
    ], AutosizeDirective);
    return AutosizeDirective;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/autosize.directive.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottomBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BottomBarComponent = (function () {
    function BottomBarComponent() {
    }
    BottomBarComponent.prototype.ngOnInit = function () {
    };
    BottomBarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-bottom-bar',
            template: __webpack_require__(818),
            styles: [__webpack_require__(803)]
        }), 
        __metadata('design:paramtypes', [])
    ], BottomBarComponent);
    return BottomBarComponent;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/bottom-bar.component.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backend_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailVerificationPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmailVerificationPageComponent = (function () {
    function EmailVerificationPageComponent(route, router, apollo, backend) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.apollo = apollo;
        this.backend = backend;
        this.status = 'checking';
        this.route.params.subscribe(function (params) {
            _this.email = params['email'];
            _this.token = params['token'];
            _this.backend.verifyEmail(_this.email, _this.token).subscribe(function (account) {
                if (account.verified) {
                    _this.status = 'success';
                }
                else {
                    _this.status = 'verification failed';
                }
            }, function (error) {
                _this.status = 'sorry, an error occured';
            });
        });
    }
    EmailVerificationPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-email-verification-page',
            template: __webpack_require__(819),
            styles: [__webpack_require__(804)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_apollo_angular__["b" /* Apollo */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__backend_service__["a" /* BackendService */]) === 'function' && _d) || Object])
    ], EmailVerificationPageComponent);
    return EmailVerificationPageComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/email-verification-page.component.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDropComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileDropComponent = (function () {
    function FileDropComponent(backend, sanitizer) {
        this.backend = backend;
        this.sanitizer = sanitizer;
        this.uploads = [];
    }
    /** pass on the click to the native input type file */
    FileDropComponent.prototype.clickFileinput = function () {
        //console.log(this.fileinput.nativeElement)
        this.fileinput.nativeElement.click();
    };
    /** on classic file(s) selection */
    FileDropComponent.prototype.fileinputChange = function ($event) {
        var _this = this;
        //console.log($event)
        var files = $event.target.files;
        //console.log(files)
        var _loop_1 = function(file) {
            // create an upload object
            var uploadObject = {
                filename: file.name,
                status: 'created',
                percent: 0,
                preview: ''
            };
            this_1.uploads.push(uploadObject);
            // attach a preview callback
            reader = new FileReader();
            reader.onload = function (event) {
                //uploadObject.preview = event.target.result
                //uploadObject.preview = this.sanitizer.bypassSecurityTrustUrl('url(' + event.target.result + ')'),
                uploadObject.preview = _this.sanitizer.bypassSecurityTrustStyle('url(' + event.target.result + ')');
                console.log('preview ready');
            };
            reader.readAsDataURL(file);
            // upload the file, and listen to news
            this_1.backend.uploadFile(file).delay(1000).subscribe(function (progress) {
                console.log('fd progress', progress);
                uploadObject.percent = progress;
            }, function (error) {
                console.log('error in upload progress', error);
                uploadObject.status = 'error';
            }, function () {
                console.log('fd complete');
                uploadObject.status = 'uploaded';
            });
        };
        var this_1 = this;
        var reader;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            _loop_1(file);
        }
    };
    FileDropComponent.prototype.onDragOver = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };
    FileDropComponent.prototype.onDrop = function ($event) {
        var _this = this;
        $event.preventDefault();
        $event.stopPropagation();
        var files = $event.dataTransfer.files;
        console.log('dropped!', $event);
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.testSRC = event.target.result;
        };
        reader.readAsDataURL(files[0]);
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var file = files_2[_i];
            this.backend.uploadFile(file).subscribe(function (res) {
                console.log('single file upload completed', res);
            });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('fileinput'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object)
    ], FileDropComponent.prototype, "fileinput", void 0);
    FileDropComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-file-drop',
            template: __webpack_require__(820),
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* DomSanitizer */]) === 'function' && _c) || Object])
    ], FileDropComponent);
    return FileDropComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/file-drop.component.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePageComponent = (function () {
    function HomePageComponent(backend) {
        this.backend = backend;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // home article
        this.backend.getArticle('public-ink', 'about-public-ink', 'hi-there').subscribe(function (article) {
            _this.article = article;
        });
    };
    HomePageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-home-page',
            template: __webpack_require__(821),
            styles: [__webpack_require__(805)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], HomePageComponent);
    return HomePageComponent;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/home-page.component.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutComponent = (function () {
    function LayoutComponent(ui, sanitizer) {
        this.ui = ui;
        this.sanitizer = sanitizer;
        this.dalei = {
            name: 'Dalei Lama',
            about: 'A badass kind of monck. Though I never went to prison like some of my bad ass homies, I still roll pretty damn hard.',
            imageURL: this.sanitizer.bypassSecurityTrustUrl('/assets/images/dalei.jpg'),
        };
        this.marty = {
            name: 'Marty Mc Hoff',
            about: 'The dude who builds the thing.',
            imageURL: this.sanitizer.bypassSecurityTrustUrl('/assets/images/hoff.jpg'),
        };
    }
    LayoutComponent.prototype.ngOnInit = function () {
    };
    LayoutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-layout',
            template: __webpack_require__(822),
            styles: [__webpack_require__(806)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ui_service__["a" /* UIService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* DomSanitizer */]) === 'function' && _b) || Object])
    ], LayoutComponent);
    return LayoutComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/layout.component.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MePageComponent = (function () {
    function MePageComponent(backend) {
        this.backend = backend;
        this.newAuthorName = "";
    }
    MePageComponent.prototype.ngOnInit = function () {
    };
    MePageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-me-page',
            template: __webpack_require__(823),
            styles: [__webpack_require__(807)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], MePageComponent);
    return MePageComponent;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/me-page.component.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaPageComponent = (function () {
    function MediaPageComponent(backend) {
        this.backend = backend;
    }
    MediaPageComponent.prototype.ngOnInit = function () {
    };
    MediaPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-media-page',
            template: __webpack_require__(824),
            styles: [__webpack_require__(808)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], MediaPageComponent);
    return MediaPageComponent;
    var _a;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/media-page.component.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backend_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PublicationPageComponent = (function () {
    function PublicationPageComponent(
        // angular
        route, router, 
        // ink
        backend, ui, 
        // graphql
        apollo) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.ui = ui;
        this.apollo = apollo;
        console.log('publication page constructed');
        this.route.params.subscribe(function (params) {
            console.log('pub page router change, constructor');
            _this.authorID = params['authorID'];
            _this.publicationID = params['publicationID'];
            // keyboard shortcuts
            _this.keyboardSubscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'keydown').subscribe(function (event) {
                if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
                    // cmd + s
                    _this.savePublication();
                    event.preventDefault();
                }
                else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
                    // cmd + d
                    _this.deletePublication();
                    event.preventDefault();
                }
            });
            if (_this.publicationID === 'create-publication') {
                _this.backend.getAuthor(_this.authorID).subscribe(function (author) {
                    _this.publication = {
                        // got to get author!
                        author: author,
                        new: true,
                        id: _this.publicationID,
                        name: 'no name yet',
                        articles: [],
                        imageURL: '',
                    };
                });
                return;
            }
            _this.backend.getPublication(_this.authorID, _this.publicationID).subscribe(function (publication) {
                _this.publication = JSON.parse(JSON.stringify(publication));
            });
        });
    }
    PublicationPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // listen to media click
        // simply sets the imageURL of the publication
        this.ui.mediaClickObservable.subscribe(function (image) {
            _this.publication.imageURL = image.url; // size?
        });
    };
    /**
     * Save (creates of updates) the local publication!
     */
    PublicationPageComponent.prototype.savePublication = function () {
        var _this = this;
        // todo: validation
        this.backend.savePublication(this.publication).subscribe(function (publicationResponse) {
            _this.ui.flashMessage(publicationResponse.info.message);
            // coule be that we are already here, this is for creates
            console.log(publicationResponse);
            _this.router.navigate(['/', publicationResponse.publication.author.id, publicationResponse.publication.id]);
        });
    };
    /**
     * Deletes the current publication
     */
    PublicationPageComponent.prototype.deletePublication = function () {
        var _this = this;
        this.backend.deletePublication(this.publication).subscribe(function (info) {
            _this.ui.flashMessage(info.message);
            _this.router.navigate(['/', _this.authorID]);
        });
    };
    PublicationPageComponent.prototype.ngOnDestroy = function () {
        console.log('publication page destroyed');
        this.keyboardSubscription.unsubscribe();
    };
    PublicationPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-publication-page',
            template: __webpack_require__(825),
            styles: [__webpack_require__(809)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__ui_service__["a" /* UIService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* Apollo */]) === 'function' && _e) || Object])
    ], PublicationPageComponent);
    return PublicationPageComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/publication-page.component.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PublicationComponent = (function () {
    function PublicationComponent(ui) {
        this.ui = ui;
        this.editable = false;
        // emit the fact that the save button has been clicked - do your thing
        // called straight from save button
        this.saveClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]();
        this.style = {
            name: {
                'font-size.px': 60,
                'font-weight': 'bold',
                'color': 'white',
                'text-align': 'center',
                'text-decoration': 'none',
                'margin': '10px 0px',
            },
            about: {
                'font-size.px': 28,
                'font-weight': 'normal',
                'color': 'white',
                'text-align': 'center',
                'margin': '10px 0px',
            }
        };
    }
    PublicationComponent.prototype.ngOnInit = function () {
        console.log('pub got pub?', this.publication);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models__["b" /* Publication */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models__["b" /* Publication */]) === 'function' && _a) || Object)
    ], PublicationComponent.prototype, "publication", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], PublicationComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* EventEmitter */]) === 'function' && _b) || Object)
    ], PublicationComponent.prototype, "saveClicked", void 0);
    PublicationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Component */])({
            selector: 'app-publication',
            template: __webpack_require__(826),
            styles: [__webpack_require__(810)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ui_service__["a" /* UIService */]) === 'function' && _c) || Object])
    ], PublicationComponent);
    return PublicationComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/publication.component.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlugifyPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SlugifyPipe = (function () {
    function SlugifyPipe() {
    }
    SlugifyPipe.prototype.transform = function (value, args) {
        return null;
    };
    SlugifyPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Pipe */])({
            name: 'slugify'
        }), 
        __metadata('design:paramtypes', [])
    ], SlugifyPipe);
    return SlugifyPipe;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/slugify.pipe.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringifyPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StringifyPipe = (function () {
    function StringifyPipe() {
    }
    StringifyPipe.prototype.transform = function (value) {
        return JSON.stringify(value);
    };
    StringifyPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Pipe */])({
            name: 'stringify'
        }), 
        __metadata('design:paramtypes', [])
    ], StringifyPipe);
    return StringifyPipe;
}());
//# sourceMappingURL=/Users/martin.micklinghoff/projects/public-ink/client/angular/src/stringify.pipe.js.map

/***/ }),

/***/ 796:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 798:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 799:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 800:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 801:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 802:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 803:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 804:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 805:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 806:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 807:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 808:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 809:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 810:
/***/ (function(module, exports) {

module.exports = ".about {\n    color: white;\n    background-color:transparent;\n    border:0;\n    outline:0;\n    text-align: center;\n}"

/***/ }),

/***/ 811:
/***/ (function(module, exports) {

module.exports = "<!--{{ backend.userAccount | stringify }}-->\n\n<div *ngIf=\"backend.userAccount\">\n  <div class=\"content-width\">\n    <div>{{ backend.userAccount.email }}, <span *ngIf=\"backend.userAccount.verified\">is verified.</span> <a [routerLink]=\"['/create-author']\">Create Author</a> \n    \n    <a [routerLink]=\"['/my-media']\">Your Media</a>\n    <a href=\"#\" (click)=\"backend.logoutUser()\">Log Out</a></div>\n  </div>\n\n\n  <div *ngFor=\"let author of backend.userAccount.authors\">\n\n    <!-- authors -->\n  \n    <app-author [author]=\"author\"></app-author>\n\n    <div *ngFor=\"let publication of author.publications\">\n\n      <!-- pubs -->\n      \n      <app-publication [publication]=\"publication\"></app-publication>\n\n      <!-- articles -->\n      <div *ngFor=\"let article of publication.articles\">\n        <app-article [article]=\"article\" [preview]=\"true\"></app-article>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n"

/***/ }),

/***/ 812:
/***/ (function(module, exports) {

module.exports = "<!-- cover for production currently -->\n<flex-col-center-center *ngIf=\"!public\" style=\"z-index: 10000; position:fixed; top: 0; left:0; width: 100vw; height: 100vh; background-color: rgba(255,255,255,1);\">\n    <h1>public.ink</h1>\n</flex-col-center-center>\n\n\n<!-- full screen message overlay -->\n<flex-col-center-center *ngIf=\"ui.message\" (click)=\"ui.message = false\" style=\"z-index: 9999; position:fixed; top: 0; left:0; width: 100vw; height: 100vh; background-color: rgba(255,255,255,0.8);\">\n    <h1>{{ ui.message }}</h1>\n</flex-col-center-center>\n\n<flex-row-center style=\"z-index: 9999; border-bottom: 2px solid #444; background-color:white; height: 50px; position:fixed; top: 0; left:0; width: 100%;\">\n    <flex-row-around-center class=\"content-width\">\n        <flex-col-center class=\"grow\">\n            <a [routerLink]=\"['/']\">Home</a>\n        </flex-col-center>\n\n        <flex-col-center class=\"grow\">\n            public.ink {{ env }}\n        </flex-col-center>\n\n        <!-- login / signup -->\n        <flex-row-center *ngIf=\"!backend.userAccount?.authenticated\" class=\"grow\">\n            <a [routerLink]=\"['/auth']\">Log In</a>\n            / \n            <a [routerLink]=\"['/auth']\">Sign Up</a>\n        </flex-row-center>\n        <!-- your account -->\n        <flex-col-center *ngIf=\"backend.userAccount?.authenticated\" class=\"grow\">\n            <a [routerLink]=\"['/my-account']\">Your Account</a>\n        </flex-col-center>\n\n\n    </flex-row-around-center>\n</flex-row-center>\n\n<div style=\"height: 50px;\">just space behind the top bar</div>\n\n\n<router-outlet></router-outlet>\n\n\n<!-- media bar! -->\n<div style=\"position:fixed; bottom: 0px; left:0px; width: 100%;\" [hidden]=\"!ui.mediaBar\">\n    <div>\n        <flex-row style=\"overflow-x:scroll; background-color: white;\">\n             \n             <flex-col *ngFor=\"let image of backend.userImages\">\n                <img (click)=\"ui.mediaClickStream.next(image)\"  [src]=\"image.url + '&w=200&h=200'\" style=\"margin:5px;\" />\n                <button (click)=\"backend.deleteImage(image.id)\">delete</button>\n             </flex-col>\n        </flex-row>\n    </div>\n</div>\n\n"

/***/ }),

/***/ 813:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"article\">\n\n    <app-article [article]=\"article\" [editable]=\"true\"></app-article>\n\n    <div style=\"position:fixed; top:52px; left: 0; width: 100%; border-bottom: 1px solid #333; background-color: white; z-index:3;\">\n        <flex-row-center id=\"toolbar\" class=\"content-width\">\n            <!-- toolbar controls go here! -->\n            <button class=\"ql-bold\">Bold</button>\n            <button class=\"ql-italic\">Italic</button>\n            <button class=\"ql-underline\">under</button>\n            <button class=\"ql-strike\">strike</button>\n            <button class=\"ql-blockquote\"></button>\n            <button class=\"ql-image\">img</button>\n            <button class=\"ql-link\">link</button>\n            <button class=\"ql-header\" value=\"1\" type=\"button\"></button>\n            <button class=\"ql-header\" value=\"2\" type=\"button\"></button>\n            <button class=\"ql-clean\">clean</button>\n        </flex-row-center>\n    </div>\n\n\n    \n    <app-bottom-bar>\n\n        <div class=\"content-width\">\n            <flex-row-between-center style=\"height:50px;\">\n                <div (click)=\"save()\">Save Chages </div>\n                <div (click)=\"save()\">Publish Article</div>\n                <div (click)=\"delete()\">Delete Article</div>\n            </flex-row-between-center>\n        </div>\n\n    </app-bottom-bar>\n\n\n\n</div>"

/***/ }),

/***/ 814:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-width\">\n\n   \n\n    <div style=\"height: 80px\"></div>\n\n    <textarea *ngIf=\"editable\" type=\"text\" \n        class=\"focus-bg\"\n        autosize\n        rows=\"1\"\n    style=\"font-size:50px; width: 100%; font-weight: bold; border:0px;\" [(ngModel)]=\"article.title\" ></textarea>    \n    <h1 *ngIf=\"!editable\"><a style=\"color: #333; text-decoration: none;\" [routerLink]=\"['/', article.publication.author.id, article.publication.id, article.id]\">{{ article.title}}</a></h1>\n    \n    <!-- punchline -->\n    <!--<h4 style=\"font-weight:400; margin-top: 5px; margin-bottom:10px; font-size: 27px; color: #555;\">An then, there where wolves.</h4>-->\n    <flex-row-start-center>\n        <!--<img src=\"/assets/images/mask.png\" style=\"border-radius: 100%; width:50px; height: 50px;\" />\n        -->\n        <div style=\"color: #666;\">By \n            <a style=\"color:dodgerblue;\" [routerLink]=\"['/', article.publication.author.id]\">{{ article.publication.author.name }}</a>\n            in <a style=\"color: dodgerblue;\" [routerLink]=\"['/', article.publication.author.id, article.publication.id]\">{{ article.publication.name }}</a> | February 2017\n        </div>\n        \n    </flex-row-start-center>\n    <div style=\"height:50px;\"></div>\n    <div #editor>editor goes here</div>\n\n    <div #hidden style=\"display: none; background-color:lime;\">jo</div>\n\n    \n</div>\n"

/***/ }),

/***/ 815:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-width\" >\n\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"doLogin($event)\">\n    <flex-col>\n      <div class=\"form-label\">\n        <label for=\"loginEmail\">Login Email</label>\n      </div>\n      <input id=\"loginEmail\" class=\"form-input\" formControlName=\"email\" type=\"email\" placeholder=\"your email address\">\n\n      <div class=\"form-label\">\n      <label for=\"loginPassword\">Password</label>\n      </div>\n      <input id=\"loginPassword\" class=\"form-input\" formControlName=\"password\" type=\"password\" placeholder=\"your password\">\n      <br>\n\n      <!-- use the 2-elements strategy. todo: proper sizing!-->\n      <flex-row-center *ngIf=\"loginLoading\" class=\"form-button\">\n        <div class=\"spinner\"></div>\n      </flex-row-center>\n      <button *ngIf=\"!loginLoading\" class=\"form-button\" type=\"submit\" [disabled]=\"!loginForm.valid\">Log In</button>\n\n    </flex-col>\n  </form>\n\n\n  <div id=\"register-login-forms\" *ngIf=\"!backend.userAccount?.authenticated\">\n\n\n\n    <simple-spacer></simple-spacer>\n    <h2>About</h2>\n    <p>\n      <b>public.ink</b> is in the ealy days of providing a network to the public that's free of commercial interst.\n      <br>\n      <br> It is an attempted antidode to centralized control over the internet.\n      <br>\n      <br> Where you are in charge, of your data, and of the conduct.\n      <br>\n      <br>\n      If you'd like to try it out, sign up below. More information on what we store, how, and why comes below.\n\n    </p>\n    <form [formGroup]=\"registrationForm\" (ngSubmit)=\"createAccount($event)\">\n      <flex-col>\n        <label class=\"form-label\" for=\"registrationEmail\">Email</label>\n        <input id=\"registrationEmail\" class=\"form-input\" formControlName=\"email\" type=\"email\" placeholder=\"your email address\">\n\n        <!-- password -->\n        <label class=\"form-label\" for=\"registrationPassword\">Password</label>\n        <input id=\"registrationPassword\" class=\"form-input\" formControlName=\"password\" type=\"password\" placeholder=\"your password\">\n\n        <!-- password again -->\n        <label class=\"form-label\" for=\"registrationPassword2\">Repeat Password</label>\n        <input id=\"registrationPassword2\" class=\"form-input\" formControlName=\"password2\" type=\"password\" placeholder=\"because typos are rael\">\n\n        <!-- checkbox galore -->\n\n\n        <label class=\"form-label\" for=\"termsCheckbox\">Them Rules</label>\n\n        <flex-row-100>\n          <!-- the checkbox -->\n          <flex-row>\n            <input type=\"checkbox\" id=\"termsCheckbox\" formControlName=\"terms\" name=\"cc\" />\n            <label tabindex=\"0\" for=\"termsCheckbox\"></label>\n          </flex-row>\n          <flex-row class=\"grow\">I accept the house rules.</flex-row>\n        </flex-row-100>\n\n        <!-- use the 2-elements strategy. todo: proper sizing!-->\n        <flex-row-center *ngIf=\"registrationLoading\" class=\"form-button\">\n          <div class=\"spinner\"></div>\n        </flex-row-center>\n        <button *ngIf=\"!registrationLoading\" class=\"form-button\" type=\"submit\" [disabled]=\"!registrationForm.valid\">Create Account</button>\n\n      </flex-col>\n    </form> <!-- end or registration -->\n\n    <!-- Auth explained -->\n    <simple-spacer></simple-spacer>\n    <h2>How authentication works on public.ink</h2>\n    <p>\n      <b>public.ink</b> employs a simple yet reasonably secure way of authenticating her users.\n      <br>\n      We don't make use of convenient social logins, such as by Facebook or Google, on purpose.\n    </p>\n\n    <simple-spacer></simple-spacer>\n    <h2>This is an anti-trend</h2>\n    <p>\n      Google was an anti-trend against big coprs ruling the internet. Then, Google itself became a big corp.\n      <br>\n      Anti-trends happen because many people feel that the status-quo could use some improving. This is what this project is about...\n    </p>\n\n\n\n\n\n\n  </div>\n\n</div>"

/***/ }),

/***/ 816:
/***/ (function(module, exports) {

module.exports = "\n\n<flex-row-center *ngIf=\"author\">\n    <flex-col class=\"content-width\">\n        <!-- center lane -->\n            <app-author [author]=\"author\" [editable]=\"1\" (create)=\"create()\"></app-author>\n            \n            <!-- if NEW: create him inline button -->\n            <button *ngIf=\"author.new\" (click)=\"saveAuthor()\">create author</button>\n        \n            <!-- if EXISTING AUTHOR: create new publication -->\n            <flex-col *ngIf=\"!author.new\">\n                <h2>create a publication</h2>\n                <p>publication is our way of grouping articles together. You can think of them as blogs, and you can create one or multiple of them.\n                <a  \n                    [routerLink]=\"['/', author.id, 'create-publication']\">\n                    start publication\n                    \n                </a>\n            </flex-col>\n           \n        <!-- end of center lane -->\n    </flex-col>\n</flex-row-center>\n\n\n<!-- this author's publications -->\n<flex-row-center *ngIf=\"publications\">\n    <app-publication *ngFor=\"let publication of publications\" [publication]=\"publication\"></app-publication>\n    <!-- could potentially add some articles in here -->\n</flex-row-center>\n\n\n <!-- update / delete existing -->\n<app-bottom-bar *ngIf=\"author && !author.new\">\n    <div class=\"content-width\" >\n        <flex-row-between>\n            <button (click)=\"saveAuthor()\">save changes</button>\n            <button (click)=\"delete()\" *ngIf=\"1\">delete author</button>\n        </flex-row-between>\n    </div>\n</app-bottom-bar>"

/***/ }),

/***/ 817:
/***/ (function(module, exports) {

module.exports = "\n<!-- author display pattern -->\n<!-- AUTHOR -->\n<flex-col-center>\n\n    <!-- information about creating authors (only for /create-author) -->\n    <div class=\"content-width\" *ngIf=\"author?.new\">\n        <h1>Create an Author</h1>\n        <p>Authors are the public actors on public.ink. You can create multiple authors, if you like.\n            You can use your real name, a nickname, or pseudonym - up to you. Likewise, you are free to chose whatever photo.\n        </p>\n    </div>\n\n\n  <!-- display pattern: author! -->\n  <flex-col-center class=\"content-width\" *ngIf=\"author\">\n\n    <!-- circle container -->\n    <flex-center\n      [style.background-color]=\"ui.colors.debug ? ui.colors.lightyellow : ''\"\n      [style.padding.px]=\"pad\"\n      >\n      <img \n        [style.box-shadow]=\"imageStyle.boxShadow\"\n        [style.border]=\"size === 'sticker' ? '4px solid #000' : '8px solid #fff'\"\n        [ngStyle]=\"imgStyle()\"\n        (click)=\"ui.mediaBar = !ui.mediaBar\"\n      style=\"border-radius: 500px;\" [src]=\"author.imageURL +'&w=150&h=150'\" />\n      \n    </flex-center>\n    <!-- author text -->\n    <flex-col-center-center class=\"grow\"\n      [style.padding.px]=\"0\"\n      [style.background-color]=\"ui.colors.debug ? ui.colors.lightred : ''\"\n      [style.color]=\"size === 'sticker' ? 'white' : '8px solid black'\"\n    >\n        \n    <!-- AUTHOR NAME -->\n    <!-- name input -->\n      <input *ngIf=\"editable\"\n      type=\"text\"\n      placeholder=\"Author Name\"\n      [(ngModel)]=\"author.name\" \n      style=\"text-align:center;\"\n      class=\"focus-bg\"\n      [ngStyle]=\"nameStyle()\" />\n\n      <!-- name link -->\n      <a *ngIf=!editable style=\"color:#333; text-decoration: none;\"\n      [routerLink]=\"['/', author.id]\"><h3\n      [ngStyle]=\"nameStyle()\"\n      >{{ author.name}}</h3></a> \n      \n      <!-- AUTHOR ABOUT -->\n      <!-- about input -->\n      <textarea *ngIf=\"editable\"\n        [(ngModel)]=\"author.about\"\n        placeholder=\"A short introduction about this author. [optional]\"\n        [ngStyle]=\"aboutStyle()\"\n        class=\"focus-bg\"\n      ></textarea>\n\n      <p *ngIf=\"!editable\">\n        {{ author.about }}\n      </p>\n\n      <!-- about text -->\n\n\n    </flex-col-center-center>\n  </flex-col-center><!-- end of display pattern author -->\n</flex-col-center>\n"

/***/ }),

/***/ 818:
/***/ (function(module, exports) {

module.exports = "<div style=\"height: 50px;\"></div>\n    <!-- bottom bar -->\n    <div style=\"position:fixed; bottom:0px; left: 0; width: 100%; border-top: 1px solid #333; background-color: white; z-index:3;\">\n        <div class=\"content-width\">\n            <ng-content></ng-content>\n        </div>\n    </div>"

/***/ }),

/***/ 819:
/***/ (function(module, exports) {

module.exports = "<h1>Account Verification</h1>\n<h2>status: {{ status }}</h2>"

/***/ }),

/***/ 820:
/***/ (function(module, exports) {

module.exports = "\n<!-- drag / click area -->\n<div \n  (dragover)=\"onDragOver($event)\"\n  (drop)=\"onDrop($event)\"\n  (click)=\"clickFileinput()\"\n  style=\"width: 100%; height: 100%; border: 2px dotted gray; padding: 10px; background-color: white; color:black\">\n  drop files or click\n  <!-- hidden standard file input (because it's not pretty, we simulate a click on it) -->\n  <input style=\"width:0; height:0;\" (change)=\"fileinputChange($event)\" type=\"file\" multiple=\"multiple\" name=\"fileinput\"  id=\"fileinput\" #fileinput />\n</div>\n\n<!-- running and completed uploads row -->\n<flex-row>\n  <!-- upload tile with preview and percent! -->\n  <flex-col-center-center  *ngFor=\"let upload of uploads\" \n    style=\"width:200px; height: 200px; background-repeat: no-repeat; background-position: center center; background-size: cover;\"\n    [style.background-image]=\"upload.preview\">\n\n      <flex-col-center-center style=\"width: 50px; height: 50px; background-color: white; border-radius: 100%; border: 1px solid #333; \">\n        {{ upload.percent }}%\n      </flex-col-center-center>\n    <!--{{ upload.filename }}\n    {{ upload.status }}-->\n  </flex-col-center-center>\n</flex-row>\n"

/***/ }),

/***/ 821:
/***/ (function(module, exports) {

module.exports = "<!--<h1>public.ink home</h1>-->\n<app-author [author]=\"article.publication.author\" *ngIf=\"article\"></app-author>\n<app-publication [publication]=\"article.publication\" *ngIf=\"article\"></app-publication>\n<app-article [article]=\"article\" *ngIf=\"article\"></app-article>\n\n<div class=\"content-width\">\n\n</div>"

/***/ }),

/***/ 822:
/***/ (function(module, exports) {

module.exports = "\n<flex-row-center\n  [style.background-color]=\"ui.colors.lightblue\"\n>\n  <h1>I am a flex row center</h1>\n</flex-row-center>\n\n<flex-row-center\n  [style.background-color]=\"ui.colors.lightgreen\"\n  >\n  <flex-row-center\n    class=\"content-width\"\n    [style.background-color]=\"ui.colors.lightyellow\">\n      <h2>I am a flex-row-center.content-width</h2> \n  </flex-row-center>\n</flex-row-center>\n\n\n<simple-spacer></simple-spacer>\n\n<app-author [author]=\"dalei\"></app-author>\n\n<!-- AUTHOR -->\n<app-author [author]=\"marty\"></app-author>\n\n<simple-spacer></simple-spacer>\n\n<!-- publication -->\n<!-- becomes publication component -->\n<flex-row-center\n class=\"bg1\"\n [style.background-color]=\"'black'\"\n  >\n  <flex-col-center\n    class=\"content-width\"\n    [style.padding.px]=\"40\"\n    [style.background-color]=\"ui.colors.debug ? ui.colors.lightyellow : ''\">\n      <h1 \n        [style.font-size.px]=\"40\"\n      style=\"color: white; text-align: center;\">The Art of Happiness</h1>\n      <app-author [author]=\"dalei\" [size]=\"'sticker'\"></app-author> \n  </flex-col-center>\n</flex-row-center>\n\n<simple-spacer></simple-spacer>\n\n<!-- article -->\n<flex-row-center\n  [style.background-color]=\"ui.colors.white\"\n  >\n  <flex-col-left\n    class=\"content-width\"\n    [style.background-color]=\"ui.colors.debug ? ui.colors.lightyellow : ''\">\n      <div style=\"width:100%; height: 30vh;\" class=\"bg2\"></div>\n      <h2>Anchors are for sailors, and the sea.</h2>\n      <div>By Hoff on Feb 2017</div>\n      <p>As such, there are many grand things to say, but where to start, where to end? As such, there are many grand things to say, but where to start, where to end?As such, there are many grand things to say, but where to start, where to end?As such, there are many grand things to say, but where to start, where to end?As such, there are many grand things to say, but where to start, where to end?As such, there are many grand things to say, but where to start, where to end?As such, there are many things to say, but where to start, where to end?As such, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As s or what?, there are many things to say, but where to start, where to end?As such, there are many things to say, but where to start, where to end?As such, there are many things to say, but where to start, where to end?\n      </p>\n  </flex-col-left>\n</flex-row-center>\n\n\n\n\n"

/***/ }),

/***/ 823:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-width\">\n  <h1>Your account</h1>\n  <button>Delete Account</button>\n</div>\n\n\n  <div *ngFor=\"let author of backend.userAccount.authors\">\n    author: <a [routerLink]=\"['/', author.id]\">{{ author.name }}</a>\n    <app-author [author]=\"author\"></app-author>\n  </div>\n\n  <div *ngIf=\"backend.userAccount.authors.length === 0\">\n    <h2>you ain't got no authors!</h2>\n    \n\n  </div>\n\n\n<a [routerLink]=\"['/', 'create-author']\">create author link</a>\n    <input \n      type=\"text\" \n      [(ngModel)]=\"newAuthorName\"\n      placeholder=\"Author Name or Pseudonym\" \n    />\n    \n"

/***/ }),

/***/ 824:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-width\">\n\n  <h2>your images</h2>\n  <app-file-drop></app-file-drop>\n  <!-- user images -->\n  <flex-row-between style=\"flex-wrap: wrap\">\n    <flex-col *ngFor=\"let image of backend.userImages\">\n      <img [src]=\"image.url + '&w=200&h=200'\" style=\"margin:5px;\" />\n      <button (click)=\"backend.deleteImage(image.id)\">delete</button>\n    </flex-col>\n  </flex-row-between>\n\n</div>"

/***/ }),

/***/ 825:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"publication\">\n\n \n\n  <app-publication \n    [publication]=\"publication\"\n    [editable]=\"true\"\n    (saveClicked)=\"savePublication()\"\n    >\n  </app-publication>\n\n  <!-- if NEW! -->\n  <button (click)=\"savePublication()\" class=\"\" *ngIf=\"publication.new\">Create publication</button>\n\n  This publication has {{ publication.articles.length }} articles.\n<div *ngFor=\"let article of publication.articles\">\n\n  <app-article [article]=\"article\" [editable]=\"false\" [preview]=\"true\"></app-article>\n  <!--<a [routerLink]=\"['/', authorID, publicationID, article.id]\">{{ article.title }}</a>-->\n</div>\n\n  <a [routerLink]=\"['/', publication.author.id, publication.id, 'create-article']\">Create Article</a>\n\n</div>\n\n\n <!-- if Existing -->\n<app-bottom-bar *ngIf=\"publication\">\n   <flex-row-between-center style=\"height:50px;\">\n    <button (click)=\"savePublication()\">Save Changes</button>\n    <button (click)=\"deletePublication()\" class=\"\" *ngIf=\"!publication.new\">Delete Publication</button>\n   </flex-row-between-center>\n\n</app-bottom-bar>\n"

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

module.exports = "<div style=\"background-color:#000; position:relative; height: 30vh;\">\n  <!-- background image -->\n  <div \n    style=\"opacity: 0.6; position:absolute; top: 0; left:0; width: 100%; height: 100%;\"\n  [style.background-image]=\"'url(' + publication.imageURL +'&w=1440&h=300' + ')'\">\n\n  </div>\n  <flex-col-center-center  style=\"position:absolute; top: 0; left:0; width: 100%; height: 100%;\">\n    \n    <flex-col-center class=\"content-width\">\n\n      <!-- name / link -->\n        <h1 [routerLink]=\"['/', publication.author.id, publication.id]\" \n          *ngIf=\"!editable\" [ngStyle]=\"style.name\"\n          [style.cursor]=\"'pointer'\"\n          >\n          {{ publication.name }}\n        </h1>\n      <!-- Name editable -->\n      <textarea \n          *ngIf=\"editable\"\n          class=\"focus-bg\"\n          [(ngModel)]=\"publication.name\"\n          [ngStyle]=\"style.name\"\n          [style.cursor]=\"'default'\"\n          autosize\n          rows=\"1\">\n      </textarea>\n\n      <!-- ABOUT -->\n      <p *ngIf=\"!editable\"\n        [ngStyle]=\"style.about\"\n      > {{ publication.about }}</p>\n      <!-- Name editable -->\n      <textarea *ngIf=\"editable\"\n          class=\"focus-bg\"\n          [(ngModel)]=\"publication.about\"\n          [ngStyle]=\"style.about\"\n          autosize\n          rows=\"1\">\n      </textarea>\n\n    </flex-col-center>\n\n\n  </flex-col-center-center>\n</div>\n\n"

/***/ })

},[1097]);
//# sourceMappingURL=main.bundle.map