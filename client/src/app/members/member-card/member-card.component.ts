import { Component, Input } from '@angular/core';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { PresenceService } from 'src/app/_services/presence.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => {
        this.toastr.success('You have liked ' + member.knownAs);
      }
    });
  }



}
