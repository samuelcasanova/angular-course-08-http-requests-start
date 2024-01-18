import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from "./post.model";
import { catchError, map } from "rxjs/operators";

const POST_API_URL = 'https://angular-course-backend-d30cc-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

@Injectable({ providedIn: 'root' })
export class PostService {
  errorSubject: Subject<Error> = new Subject()
  constructor(private http: HttpClient) {}

  storePost(post: Post) {
    const postObservable = this.http.post(POST_API_URL, post)
      .pipe(catchError((err, original) => {
        this.errorSubject.next(err)
        return original
      }))
    return postObservable
  }

  fetchPosts(): Observable<Post[]> {
    const fetchObservable = this.http.get<{ [key: string]: Post; }>(POST_API_URL, { 
        headers: { 'custom-header': 'hello world' },
        params: { 'print': 'pretty' }
      })
      .pipe(map(responseData => {
        if (responseData === null) {
          return [];
        }
        return Object.keys(responseData).map(key => ({ id: key, ...responseData[key] }));
      }))
      .pipe(catchError((err, original) => {
        this.errorSubject.next(err)
        return original
      }))
    return fetchObservable
  }

  deletePosts() {
    const deleteObservable = this.http.delete(POST_API_URL)
      .pipe(catchError((err, original) => {
        this.errorSubject.next(err)
        return original
      }))
    return deleteObservable
  }
}