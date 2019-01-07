import {Component, OnInit} from "@angular/core";
import {VoteProvider} from "@providers/vote/vote";

@Component({
    selector: 'vote-page',
    templateUrl: './vote.page.html',
    styleUrls: ['./vote.page.scss']
})
export class VotePage implements OnInit
{
    /**
     * List votes
     *
     * @var any[]
     */
    public votes: any = [];

    /**
     * Vote count
     *
     * @var number
     */
    public totalVotes: number = 0;

    /**
     * Top-rated Token Information
     *
     * @var any
     */
    public topRating: any = {
        name: <string> null,
        change_cycle: <number> 0
    };

    /**
     * Object creation VotePage
     *
     * @param {VoteProvider} voteProvider - Vote provider
     */
    constructor(
        private voteProvider: VoteProvider
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        this.voteProvider
            .getVotesFromServer({})
            .then(vote => {
                this.votes = vote.res;
                this.totalVotes = vote.totalVotes;
                this.topRating = vote.topRating;
            })
    }
}
