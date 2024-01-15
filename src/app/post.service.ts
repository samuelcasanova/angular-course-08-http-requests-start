import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

const POST_API_URL = 'https://angular-course-backend-d30cc-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  storePost(post: Post) {
    this.http.post(POST_API_URL, post)
    .subscribe((responseData: { name: string }) => {
      console.log('Post stored: ', responseData);
    })
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post }>(POST_API_URL)
      .pipe(map(responseData => {
        if (responseData === null) {
          return []
        }
        return Object.keys(responseData).map(key => ({ id: key, ...responseData[key] }))
      }))
  }

  deletePosts() {
    return this.http.delete(POST_API_URL)
  }
}