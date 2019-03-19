import { Injectable, OnInit, OnDestroy } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthHttpService } from "./auth-http-service";
import { Transaction } from "../model/transaction-model";
import { MessagesService } from "../service/messages.service";
import { Message } from "../model/message.model";
import { ExchangeOfficeHttpService } from "./exchange-office-http-service";
import { BankTransactionsHttpService } from "./bank-transactions-http-service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";



@Injectable()
export class MessageSTOMPService implements OnInit, OnDestroy{
    
    private serverUrl = 'http://localhost:8080/socket2';
    private stompClient;
    private authSubscription : Subscription;

    

    constructor(private messageService : MessagesService,
                private authService : AuthHttpService,
                private exchangeOfficeHttpService : ExchangeOfficeHttpService,
                private bankTransactionHttpService : BankTransactionsHttpService,
                private httpClient : HttpClient,
                private router: Router){

                    this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
                        if(state == true) {
                            this.initialize();
                        }
                        else{
                            this.stompClient.disconnect();
                        }
                    })
                    
        
    }

    ngOnInit() {}

    initialize(){
        // let webSocket = new SockJS(this.serverUrl);
        let webSocket = new SockJS(this.serverUrl+"/?access_token="+this.authService.getToken());
        this.stompClient = Stomp.over(webSocket);
        let that = this;
        
        this.stompClient.connect({}, () => {
            this.loadAllMessages();
            that.stompClient.subscribe("/manager/queue", (result) => {
                let variable = JSON.parse(result.body)
                let message : Message;
                let transaction : Transaction;
                if(variable.id != undefined){
                    // setTimeout(() => this.transactionHttpService.getTodayTransactionHistory(), 2000);
                    transaction = JSON.parse(result.body);
                    console.log(transaction);
                    this.exchangeOfficeHttpService.updateTransactionHistoryAndCashRegisterState(transaction);
                }
                else{
                    message = JSON.parse(result.body);
                    if(message.type === "Update"){
                        this.exchangeOfficeHttpService.updateStateOfParticularMoneyExchnageOffice(message);
                    }
                    else if(message.type === "BankTransaction"){
                        this.bankTransactionHttpService.getAllBankTransaction();
                    }
                    this.messageService.addMessage(message);
                    console.log(message);
                }

            });
        },()=>{
            this.authService.logout()
            this.router.navigate(['login']);
            alert("Wymagane ponowne logowanie");
        });
    }

    
    
    sendMessage(message : Message){
        this.stompClient.send("/app/send/toEmployee" , {}, JSON.stringify(message)); 
        this.messageService.addMessage(message);
    }

    loadAllMessages(){
        this.httpClient.get<Message []>('http://localhost:8080/messages/All/'+this.authService.getNameOfWorkPlace(),{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((messages : Message []) => {
            console.log(messages);
            this.messageService.addMessages(messages);
        })
    }
    
    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}