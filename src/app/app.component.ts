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

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(post: Post) {
    this.postService.storePost(post)
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
}
