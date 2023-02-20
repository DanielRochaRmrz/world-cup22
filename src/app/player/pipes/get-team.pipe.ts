import { Pipe, PipeTransform } from '@angular/core';

import { TeamService } from '../../team/services/team.service';

@Pipe({
  name: 'getTeam'
})
export class GetTeamPipe implements PipeTransform {

  constructor( private teamService: TeamService ) {

  }

  async transform(uidTeam: string) {

    const team: any = await this.teamService.getTeam(uidTeam);
    return team;

  }

}
