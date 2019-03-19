import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../model/message.model';
import { Router } from '@angular/router';
import { MessageSTOMPService } from '../../http-service/message-stomp-service';
import { MessagesService } from '../../service/messages.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.css']
})
export class MessagesPanelComponent implements OnInit, OnDestroy {

  subsciption : Subscription;
  messages : Message [];

  constructor(private messageService : MessagesService,
              private messageStompService : MessageSTOMPService,
              private router : Router) { 

  }

  ngOnInit() {
    this.subsciption = this.messageService.messageWasAdded.subscribe(
      (mess : Message []) => {
        this.messages = mess;
      }
    );
    this.messages = this.messageService.getMessages();
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

}
