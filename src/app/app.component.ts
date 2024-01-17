import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;
  error: string | null = null
  postServiceErrorSubscription: Subscription

  constructor(private http: HttpClient, private postService: PostService) {}
  
  ngOnInit() {
    this.onFetchPosts()
    this.postServiceErrorSubscription = this.postService.errorSubject.subscribe(error => {
      this.handleError(error)
    })
  }
  
  ngOnDestroy(): void {
    this.postServiceErrorSubscription.unsubscribe()
  }

  onCreatePost(post: Post) {
    this.postService.storePost(post).subscribe(() => {
      console.log('Post created:', post)
    })
  }
  
  onFetchPosts() {
    this.isLoading = true
    this.postService.fetchPosts().subscribe(posts => {
      console.log(posts)
      this.loadedPosts = posts
      this.isLoading = false
    })
  }
  
  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }
  
  handleError(error: Error) {
    console.error(error)
    this.error = error.message
  }
}
