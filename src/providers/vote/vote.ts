import { Injectable } from "@angular/core";
import * as _ from "lodash";

// Providers
import { TronProvider } from "@providers/tron/tron";
import {Logger} from "@providers/logger/logger";

// Interface votes
export interface VoteHistoryProposal {
    endingAddress?: string;
}

export interface TransactionVoteProposal {
    srAddress: string;
    voteCount: number;
}

@Injectable()
export class VoteProvider
{
    /**
     * Object creation VoteProvider
     *
     * @param {TronProvider} tron - Tron provider
     * @param {Logger} logger - Log provider
     */
    constructor(
        private tron: TronProvider,
        private logger: Logger
    ) {
        //
    }

    /**
     * createVoteTx
     *
     *  Create a new vote transaction
     *
     * @param {TransactionProposal} txp - the details of the transaction
     * @param {TransactionProposal} txp.srAddress - team address
     * @param {TransactionProposal} txp.voteCount - Number of votes
     * @param {string} accountAddress - Sender's address
     * @returns {Promise} Promise object containing the newly created transaction id
     */
    createVoteTx(txp: Partial<TransactionVoteProposal>, accountAddress: string)
    {
        return new Promise((resolve, reject) => {
            // Checking important parameters
            if (_.isEmpty(txp)) return reject('MISSING_PARAMETER');

            // A temporary measure, we will soon add
            // the ability to vote on several positions
            let votes: any = {};
            votes[ txp.srAddress ] = txp.voteCount;

            this.tron.createVoteProposal(votes, accountAddress,
                (err: any, createdTxp: any) => {
                    if (err) return reject(err);
                    else {
                        this.logger.debug('Transaction Vote created');
                        return resolve(createdTxp);
                    }
                })
        });
    };


    /**
     * getVotesFromServer
     *
     * Get the voting list
     *
     * @param {VoteHistoryProposal} options - Option params
     * @param {VoteHistoryProposal} options.endingAddress - Closing address
     * @return {Promise} return votes
     */
    getVotesFromServer(options: Partial<VoteHistoryProposal>): Promise<any>
    {
        return new Promise((resolve, reject) => {
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
