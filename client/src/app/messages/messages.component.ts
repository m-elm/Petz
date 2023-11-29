import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { PresenceService } from '../_services/presence.service';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { Conversation } from '../_models/conversation';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') myScrollContainer?: ElementRef;

  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  conversations: Conversation[] = [];

  username: string = '';
  messageContent = '';

  otherUsername: string = '';
  otherUserPhotoUrl: string = '';
  user?: User;

  constructor(
    public messageService: MessageService,
    public presenceService: PresenceService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.username = user.username;
        }
      },
    });

    this.loadConversations();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe({
        next: (response) => {
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        },
      });
  }

  loadMessageThread(username: string) {
    this.messageService.createHubConnection(this.user!, username);
    this.otherUsername = username;
    this.otherUserPhotoUrl =
      this.conversations.find((c) => c.contactUsername === username)
        ?.contactPhotoUrl || '';
  }

  loadConversations() {
    this.messageService.getConversations().subscribe({
      next: (response) => {
        if (response) this.conversations = response;
      },
    });
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages?.splice(
          this.messages.findIndex((m) => m.id === id),
          1
        );
      },
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService
      .sendMessage(this.otherUsername, this.messageContent)
      .then(() => {
        this.messageForm?.reset();
      });
    console.log(this.messageContent);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer!.nativeElement.scrollTop =
        this.myScrollContainer!.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
