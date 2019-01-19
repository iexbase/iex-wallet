
import { FormControl } from '@angular/forms';

// Providers
import { AddressProvider } from '@providers/address/address';

export class AddressValidator {
    /**
     * Static address provider
     *
     * @return AddressProvider
     */
    static addressProvider: AddressProvider;

    /**
     * Create a new AddressValidator object
     *
     * @param {AddressProvider} addressProvider - Address provider
     */
    constructor(addressProvider: AddressProvider) {
        AddressValidator.addressProvider = addressProvider;
    }

    /**
     * Validate Tron address
     *
     * @param {FormControl} control - Initializing Form Controls
     */
    isValid(control: FormControl) {
        return AddressValidator.addressProvider.validateAddress(control.value)
            ? null
            : { 'Invalid Address': true };
    }
}
