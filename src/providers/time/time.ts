/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { Injectable } from '@angular/core';

@Injectable()
export class TimeProvider {
    constructor() {}

    public withinSameMonth(time1: number, time2: number): boolean {
        if (!time1 || !time2) { return false; }
        const date1 = new Date(time1);
        const date2 = new Date(time2);
        return this.getMonthYear(date1) === this.getMonthYear(date2);
    }

    public withinPastDay(time: any): boolean {
        const now = new Date();
        const date = new Date(time);
        return now.getTime() - date.getTime() < 1000 * 60 * 60 * 24;
    }

    public isDateInCurrentMonth(date: Date): boolean {
        const now = new Date();
        return this.getMonthYear(now) === this.getMonthYear(date);
    }

    public getMonthYear(date: Date): string {
        return `${date.getMonth()}-${date.getFullYear()}`;
    }
}
