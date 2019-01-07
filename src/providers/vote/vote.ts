import { Injectable } from "@angular/core";
import * as _ from "lodash";

// Providers
import { TronProvider } from "@providers/tron/tron";

// Interface votes
export interface VoteHistoryProposal {
    endingAddress?: string;
}

@Injectable()
export class VoteProvider
{
    /**
     * Object creation VoteProvider
     *
     * @param {TronProvider} tron - Tron provider
     */
    constructor(
        private tron: TronProvider
    ) {
        //
    }

    /**
     * getTxsFromServer
     *
     * Get the voting list
     *
     * @param {VoteHistoryProposal} options - Option params
     * @param {VoteHistoryProposal} options.endingAddress - Closing address
     * @return {Promise} return votes
     */
    getVotesFromServer(options: Partial<VoteHistoryProposal>): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            let res: any = [];

            let result = {
                res,
                total: 0,
                totalVotes: 0,
                topRating: null
            };

            this.tron.getVoteHistory((err: any, historyVote: any) =>
            {
                // In case of problems, we don’t continue
                if (err) return reject(err);

                // If you received an empty response from the server, do not continue
                if (_.isEmpty(historyVote['data'])) return resolve(result);

                //Returns all votes to the address, if the "endingAddress" is filled in,
                // in this case, we will not receive data beyond this id
                res = _.takeWhile(historyVote['data'], (vote: any) => {
                    return vote.address != options.endingAddress;
                });

                result.res = res;
                result.total  = historyVote.total;
                result.totalVotes  = historyVote.totalVotes;
                result.topRating = historyVote.fastestRise;

                return resolve(result);
            });
        });
    }
}
