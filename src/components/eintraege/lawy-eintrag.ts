import { customElement, html, LitElement, property } from "lit-element";
import { NoShadowMixin } from "../../client-packages/no-shadow/noshadow.mixin";
import './eintrag.scss';

@customElement('lawy-eintrag')
class LawyEintrag extends NoShadowMixin(LitElement) {

    @property() fett: Boolean = false;
    @property() datum: string = "";
    @property() gewicht: string = "";
    @property() symbol: string = "";

    render() {
        return html`
        <div class="oneline">
            <div class="part ${this.fett ? "bold" : ""}">${this.datum}</div>
            <div class="part ${this.fett ? "bold" : ""}">${this.gewicht}</div>
            <div class="part ${this.fett ? "bold" : ""}">${this.symbol === "neutral" ? html`<ion-icon name="chevron-forward-outline"></ion-icon>` : this.symbol === "negative" ? html`<ion-icon name="chevron-down-outline"></ion-icon>` : this.symbol === "positive" ? html`<ion-icon name="chevron-up-outline"></ion-icon>` : this.symbol}</div>
        </div>
        `
    }
}