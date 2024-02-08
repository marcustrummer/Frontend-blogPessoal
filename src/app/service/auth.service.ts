import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  entrar(userLogin: UserLogin):Observable<UserLogin> {
    return this.http.post<UserLogin>('https://personalblog-210efde6f59c.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://personalblog-210efde6f59c.herokuapp.com/usuarios/cadastrar', user)
  }

  atualizarUsuario(user: User): Observable<User> {
    return this.http.put<User>('https://personalblog-210efde6f59c.herokuapp.com/usuarios/atualizar', user, this.token)
  }



  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://personalblog-210efde6f59c.herokuapp.com/usuarios/${id}`, this.token)
  }
  
  logado(){
    let ok: boolean = false;

    if(environment.token != ''){
      ok = true;
    }
    return ok
  }


  adm(){
    let ok: boolean = false;

    if(environment.tipoUsuario == 'admin'){
      ok = true;
    }
    return ok
  }
}
