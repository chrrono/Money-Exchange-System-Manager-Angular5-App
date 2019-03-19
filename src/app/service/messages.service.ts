import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Message } from "../model/message.model";

@Injectable()
export class MessagesService{

    messageWasAdded = new Subject<Message[]>();
    messages : Message [] = [
        {
        "type" : "komunikat",
        "content" : "wiadomosc od kasjera safffffffff asfffffffffffff asffff",
        "sender" : "Szubryt",
        "receiver" : "Poczta",
        "time" : "2018-09-15 16:11:42"
      }];

    constructor(){}

    addMessages(messages : Message []){
        if(messages == [])
            return;
        this.messages = messages;
        this.messageWasAdded.next(this.messages.slice());
    }

    addMessage(message : Message){
        this.messages.unshift(message);
        this.messageWasAdded.next(this.messages.slice());
    }

    setMessages(messages : Message []){
        this.messages = messages;
        this.messageWasAdded.next(this.messages.slice());
    }

    deletMessage(message : Message){
        let index = this.messages.indexOf(message);
        if(index != -1){
            this.messages.splice(index,1);
            this.messageWasAdded.next(this.messages.slice());
        }
    }

    getMessages(){
        return this.messages.slice();
    }
}