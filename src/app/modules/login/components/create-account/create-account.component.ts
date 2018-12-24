/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from "@angular/core";
import { WalletProvider } from "@providers/wallet/wallet";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Redux
import { AppState } from "@redux/index";
import { Store } from "@ngrx/store";

@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit
{
    /**
     * Tracks the value and validity state of a
     * group of FormControl instances.
     *
     * @var FormGroup
     */
    public exportWalletForm: FormGroup;

    /**
     * Create a new LoginPage object
     *
     * @param {Store} store - Reactive service
     * @param {Router} router - Provides the navigation and url manipulation capabilities.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {FormBuilder} formBuilder - Creates an AbstractControl from a user-specified configuration.
     */
    constructor(
        protected store: Store<AppState>,
        private router: Router,
        public walletProvider: WalletProvider,
        private formBuilder: FormBuilder,
    ) {}

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        this.exportWalletForm = this.formBuilder.group(
            {
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            { validator: this.matchingPasswords('password', 'confirmPassword') }
        );
    }

    /**
     * Verification of passwords for coincidence
     *
     * @param {string} passwordKey - password
     * @param {string} confirmPasswordKey - Password confirmation
     * @return any
     */
    private matchingPasswords(passwordKey: string, confirmPasswordKey: string):
        (group: FormGroup) => ({ mismatchedPasswords: boolean } | undefined)
    {
        return (group: FormGroup) => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
            return undefined;
        };
    }

    /**
     * Create an account and go to home
     *
     * @return void
     */
    goToCheck(): void
    {
        this.walletProvider.createPassword(this.exportWalletForm.value.password)
            .then(() => {
                this.router.navigate(['/', 'dashboard']);
            })
    }
}
