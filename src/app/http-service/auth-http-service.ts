import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { TokenData } from "../login/tokenData.model";
import { Subject } from "rxjs/Subject";
import { WorkPlaceInfo } from "../login/work-place-info";
import { WorkPlace } from "../model/work-place-model";

@Injectable()
export class AuthHttpService {

    tokenData : TokenData;
    workPlaceData : WorkPlaceInfo;
    ifLogin : boolean;
    ifLoginChanged = new Subject<boolean>();

    constructor(private httpClient : HttpClient){}

    login(login : string, password: string){
        this.httpClient.post(('http://localhost:8080/oauth/token'),"",{
            observe: 'body',
            responseType: 'json',
            params : new HttpParams().append("grant_type","password")
                                        .append("username", login)
                                        .append("password", password),
            headers : new HttpHeaders().set("Authorization", "Basic " + btoa(login + ":" + password))
                                        .set("Content-Type", "application/x-www-form-urlencoded")
        }).subscribe((token : TokenData) => {
            this.ifLogin = true;
            this.tokenData = token;
            console.log(this.tokenData);
            setTimeout(()=>this.getIdentity(login),1000);
            setTimeout(()=>this.ifLoginChanged.next(true),2000);
            // if(this.ifLogin)
            //     setTimeout(() => this.login(login1, password1, login2, password2), this.tokenData.expires_in*1000);  
        });
    } 

    getIdentity(login1 : string){
        this.httpClient.post(('http://localhost:8080/WorkPlace/info'),"",{
            observe: 'body',
            responseType: 'json',
            params : new HttpParams().set("user", login1),
            headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
                                        .set("Authorization","Bearer "+this.getToken())
        }).subscribe((data : WorkPlaceInfo) => {
            console.log(data);
            this.workPlaceData = data;
            // setTimeout(() => this.getAllExchangeOficess(),2000);
        })
    }

    logout(){
        this.ifLogin = false;
        this.tokenData = null;
        this.ifLoginChanged.next(false);
    }

    getToken(){
        if(this.tokenData == null)
            return "";
        return this.tokenData.access_token;
    }

    getNameOfWorkPlace(){
        if(this.workPlaceData == null)
            return "";
        return this.workPlaceData.name;
    }

    isAuthenticated() {
        return this.ifLogin;
    }

    // getAllExchangeOficess() {
    //     this.httpClient.get<Array<WorkPlace>>('http://localhost:8080/WorkPlace/info/all', {
    //         observe: 'body',
    //         responseType: 'json',
    //         headers : new HttpHeaders().set("Authorization","Bearer "+this.getToken())
    //     })
    //         .subscribe((wokPlaceList : Array<WorkPlace>) => {
    //             console.log(wokPlaceList);
    //         });
    // }
}