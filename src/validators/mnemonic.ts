
import { FormControl } from "@angular/forms";

// Providers
import { WalletProvider } from "@providers/wallet/wallet";

export class MnemonicValidator
{
    /**
     * Static wallet provider
     *
     * @return WalletProvider
     */
    static walletProvider: WalletProvider;

    /**
     * Create a new WalletProvider object
     *
     * @param {WalletProvider} walletProvider - WalletProvider provider
     */
    constructor(walletProvider: WalletProvider) {
        MnemonicValidator.walletProvider = walletProvider;
    }

    /**
     * Validate Mnemonic
     *
     * @param {FormControl} control - Initializing Form Controls
     */
    isValid(control: FormControl) {
        return MnemonicValidator.walletProvider.isValidMnemonic(control.value)
            ? null
            : { 'Invalid Mnemonic': true };
    }
}
