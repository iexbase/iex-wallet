import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MatSnackBar } from "@angular/material";

// Modules
import { NodePage } from "@modules/settings/pages/node/node.page";

// Providers
import { TronProvider } from "@providers/tron/tron";

@Component({
    selector: 'add-node',
    templateUrl: './add-node.component.html',
    styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent implements OnInit
{
    /**
     * Create a form group
     *
     * @var FormGroup
     */
    nodeAdd: FormGroup;

    /**
     * Object creation AddNodeComponent
     *
     * @param {MatDialogRef} dialogRef - Reference to a dialog opened via the MatDialog service
     * @param {FormBuilder} formBuilder - Creates an `AbstractControl` from a user-specified configuration.
     * @param {TronProvider} tron - Tron provider
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        public dialogRef: MatDialogRef<NodePage>,
        private formBuilder: FormBuilder,
        private tron: TronProvider,
        private snackBar: MatSnackBar
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
        // configure
        this.nodeAdd = this.formBuilder.group({
            name: [
                '',
                Validators.compose([Validators.minLength(1), Validators.required])
            ],
            fullNode: [
                '',
                Validators.compose(
                    [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
                        Validators.required
                    ])
            ],
            solidityNode: [
                '',
                Validators.compose(
                    [
                        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
                        Validators.required
                    ])
            ],
            eventServer: [
                ''
            ],
        });
    }

    /**
     * Add a new node to the list
     *
     * @return void
     */
    save(): void
    {
        this.tron.addNode(this.nodeAdd.value).then(() => {
            this.onClose()
        }).catch(err => {
            this.snackBar.open(err, null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog']
            })
        });
    }

    /**
     * Close modal
     *
     * @return void
     */
    onClose(): void {
        this.dialogRef.close()
    }
}
