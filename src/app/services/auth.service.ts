import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<Jwt>{
    return this.httpClient.post<Jwt>(`${this.AUTH_SERVER}/register`, 
    user).pipe(tap(
      (res: Jwt) => {
        if(res){
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresToken);
        }
      })
    );
  }

  login(user: User): Observable<Jwt>{
    return this.httpClient.post<Jwt>(`${this.AUTH_SERVER}/login`, 
    user).pipe(tap(
      (res: Jwt) => {
        if(res){
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresToken);
        }
      })
    );
  }

  logout(){
    this.token = null;
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresToken: string): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresToken);
    this.token = token;
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACEESS_TOKEN");
    }
    return this.token;
  }
}
