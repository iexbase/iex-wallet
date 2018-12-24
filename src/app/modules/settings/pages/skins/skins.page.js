var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { LocalStorage } from "ngx-webstorage";
import { MatAccordion } from "@angular/material";
import { Store } from "@ngrx/store";
import * as SkinActions from "@redux/skins/skins.actions";
// Providers
import { ConfigProvider } from "@providers/config/config";
var SkinsPage = /** @class */ (function () {
    /**
     * Object creation SkinsPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {Store} store - Reactive provider
     */
    function SkinsPage(configProvider, store) {
        this.configProvider = configProvider;
        this.store = store;
        /**
         * List of available styles
         *
         * @return any[]
         */
        this.skins = [];
        // Active this page
        this.settingsView = 'skins';
        this.skins = [
            {
                name: "colors",
                themes: [
                    { 'name': 'default', 'class': 'theme-default' }
                ]
            },
            {
                name: "textures",
                themes: [
                    { 'name': 'mosaic', 'class': 'theme-mosaic' },
                    { 'name': 'mamba', 'class': 'theme-mamba' },
                    { 'name': 'padded', 'class': 'theme-padded' },
                    { 'name': 'wood', 'class': 'theme-wood' },
                    { 'name': 'argyle', 'class': 'theme-argyle' },
                    { 'name': 'jeans', 'class': 'theme-jeans' },
                    { 'name': 'diagmonds', 'class': 'theme-diagmonds' },
                    { 'name': 'woven', 'class': 'theme-woven' }
                ]
            }
        ];
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    SkinsPage.prototype.ngOnInit = function () {
        this.selectedSkin = this.configProvider.get('skins.name');
    };
    /**
     * Modify and save new style
     *
     * @param {string} name - Skin name
     * @return void
     */
    SkinsPage.prototype.save = function (name) {
        this.configProvider.set('skins.name', name);
        this.selectedSkin = name;
        var update = {
            id: 1,
            changes: {
                name: name
            }
        };
        this.store.dispatch(new SkinActions.UpdateSkin({ skin: update }));
    };
    /**
     * Status skins group
     *
     * @param {string} group - Skin group
     * @return boolean
     */
    SkinsPage.prototype.expandedOpen = function (group) {
        return this.configProvider.get('skins.settings.' + group) || false;
    };
    /**
     * Activity expansion panel
     *
     * @param {string} group - Skin type
     * @return boolean
     */
    SkinsPage.prototype.openExpansion = function (group) {
        this.configProvider.set('skins.settings.' + group, true);
    };
    /**
     * Deactivate expansion panel
     *
     * @param {string} group - Skin group
     * @return boolean
     */
    SkinsPage.prototype.closeExpansion = function (group) {
        this.configProvider.set('skins.settings.' + group, false);
    };
    __decorate([
        ViewChild('skinsaccordion'),
        __metadata("design:type", MatAccordion)
    ], SkinsPage.prototype, "myPanels", void 0);
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], SkinsPage.prototype, "settingsView", void 0);
    SkinsPage = __decorate([
        Component({
            selector: 'skins',
            templateUrl: './skins.page.html',
            styleUrls: ['./skins.page.scss'],
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            Store])
    ], SkinsPage);
    return SkinsPage;
}());
export { SkinsPage };
//# sourceMappingURL=skins.page.js.map