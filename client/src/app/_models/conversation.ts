export interface Conversation {
  id : number;
  appUsername : string;
  contactUsername : string;
  contactPhotoUrl : string;
  lastMessage : string;
  lastSent? : Date;
}
