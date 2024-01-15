import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;
  error: string | null = null

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(post: Post) {
    this.postService.storePost(post).subscribe(() => {
      console.log('Post created:', post)
    }, error => {
      this.handleError(error)
    })
  }
  
  onFetchPosts() {
    this.isLoading = true
    this.postService.fetchPosts().subscribe(posts => {
      console.log(posts)
      this.loadedPosts = posts
      this.isLoading = false
    }, error => {
      this.handleError(error)
    })
  }
  
  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    }, error => {
      this.handleError(error)
    })
  }
  
  handleError(error: Error) {
    console.error(error)
    this.error = error.message
  }
}
