import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { ArticleService } from 'src/app/core/article.service';
import { Article } from 'src/app/shared/article.model';

@Component({
  selector: 'listing-widget',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
  
export class ListingComponent implements OnInit, OnDestroy {
    
    searchForm = new FormGroup({
        entry: new FormControl(''),
        type: new FormControl('id')
    });

    articleAddForm = new FormGroup({
        userId: new FormControl(''),
        title: new FormControl(''),
        body: new FormControl('')
    });

    articleForm = new FormGroup({
        userId: new FormControl(''),
        id: new FormControl(''),
        title: new FormControl(''),
        body: new FormControl('')
    });
    
    fieldColumns: string[] = ['id', 'author', 'title', 'action'];
    columnsToDisplay: string[] = this.fieldColumns.slice();
    
    subscriptions$: Subscription[] = [];

    user:any;
    articles: Array<Article> = [];
    allArticles: Array<Article> = [];
    searchedArticles: Array<Article> = [];
    
    searchType:any;
    searchEntry:any;
    selectedTitle:any;
    selectedId:any;
    selectedArticle: Array<Article> = [];
    selectedAction:any;

    searchToggle = 'id';

    isShowModal = false;

    constructor(
        private UserService: UserService,
        private AuthService: AuthService,
        private ArticleService: ArticleService
    ) { }
    
    ngOnInit() {
        this.getCurrentUser();
        this.getPosts();
    }

    getCurrentUser() {
        this.user = JSON.parse(this.UserService.getCurrentUser());
    }

    getPosts() {

        this.subscriptions$.push(
            this.ArticleService.getPosts()
                .subscribe((response:any) => {
                    
                    this.UserService.getUsers()
                        .subscribe((item:any) => {

                            response.map((article: any) =>{
                                
                               let result = item.find((element: { id: any; }) => element.id == article.userId);

                               article.author = result.name;
                            })
                           
                            this.allArticles = response;
                            this.articles = this.allArticles;

                            this.sortArticles();
                        });
                })
        );
    }

    sortArticles() {
        this.articles = this.articles.sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id))
    }

    search() {

        this.searchedArticles = this.allArticles;

        this.searchType = this.searchForm.value.type;
        this.searchEntry = this.searchForm.value.entry;

        if (this.searchEntry.trim() !== '') {

            if (this.searchType === 'title') {

                this.searchedArticles = this.searchedArticles.filter((item:any) => item[this.searchType].indexOf(this.searchEntry) > -1);
                this.articles = this.searchedArticles;    

                return;
            }

                this.searchEntry = parseInt(this.searchEntry);
                this.searchedArticles = this.searchedArticles.filter((item:any) => item[this.searchType] === this.searchEntry);
                this.articles = this.searchedArticles;       
        }

        this.articles = this.searchedArticles;       
    }

    setSearchType(type:any) {

        this.searchToggle = type;

        this.searchForm.patchValue({
            type: type
        });

        this.search();
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach((s) => s.unsubscribe());
    }

    showModal(data:any, action:any) {

        this.clear();
        
        this.selectedAction = action;

        document.body.style.overflow = 'hidden';

        if (action === 'add') {

            this.articleForm.patchValue({
                userId: data.id,
                title: data.title,
                body: data.body
            });
        } else {
            
            this.selectedArticle = data;
            this.selectedTitle = data.title;
            this.selectedId = data.id;

            this.articleForm.patchValue({
                id: data.id,
                userId: data.userId,
                title: data.title,
                body: data.body
            });
        }

        this.isShowModal = true;
    }

    closeModal() {

        document.body.style.overflow = 'auto';
        this.clear();        
    }

    clear() {
        this.isShowModal = false;
        this.articleForm.reset();
        delete this.selectedId;
        delete this.selectedTitle;
        delete this.selectedAction;
    }

    save() {

        let html = '';

        if (this.selectedAction === 'ADD') {

            this.articleAddForm.patchValue({
                userId: this.user[0].id,
                title: this.articleForm.value.title,
                body: this.articleForm.value.body
            });

            this.ArticleService.addArticle(this.articleAddForm.value).subscribe((response:any) => {
                
                html += ('Article Updated! \n \n' +
                    'Article ID: ' + response.id + '\n' +
                    'Title: ' + response.title + '\n' +
                    'User ID: ' + response.userId + '\n' +
                    'Body: ' + response.body + '\n'
                );
    
                alert(html);
            });

        } else {
            
            this.ArticleService.updateArticle(this.articleForm.value).subscribe((response:any) => {
                
                html += ('Article Updated! \n \n' +
                    'Article ID: ' + response.id + '\n' +
                    'Title: ' + response.title + '\n' +
                    'User ID: ' + response.userId + '\n' +
                    'Body: ' + response.body + '\n'
                );
    
                alert(html);
            });
        }
    }
}
