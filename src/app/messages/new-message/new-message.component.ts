import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageSTOMPService } from '../../http-service/message-stomp-service';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  receivers = ["Poczta","Szubryt","Krynica"];
  sender = "Biuro";
  content : string;
  messageForm : FormGroup;
  firstFocus = true;

  constructor(private datePipe : DatePipe,
              private messageStompService : MessageSTOMPService) { }
  

  ngOnInit() {
    this.messageForm = new FormGroup({
      "messageData" : new FormGroup({
        "receiver" : new FormControl("Poczta"),
        "content" : new FormControl("Tutaj wpisz tresc komunikatu ..."),
      })
    })
  }

  afterFirstFocus(){
    if(this.firstFocus == true){
      this.messageForm.patchValue({
        "messageData" : {
          "content" : ""
        }
      })
      this.firstFocus = false;
    }
  }

  SendMessage(){
    let time = this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss");
    let message = new Message(this.sender, this.messageForm.get("messageData.receiver").value,
                              this.messageForm.get("messageData.content").value,"information", time);
    this.messageStompService.sendMessage(message);
    
  }

}

