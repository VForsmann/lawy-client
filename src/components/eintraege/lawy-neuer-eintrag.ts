import { customElement, html, LitElement, property } from "lit-element";
import { NoShadowMixin } from "../../client-packages/no-shadow/noshadow.mixin";
import { addMeasurement } from "../../redux/actions/measurements.actions";
import { store } from "../../redux/store";
import measurementService from "../../services/measurement.service";
import './neuer-eintrag.scss';

@customElement('lawy-neuer-eintrag')
class LawyNewEntry extends NoShadowMixin(LitElement) {

    modal: HTMLIonModalElement | undefined = undefined;
    @property() lastWeight: number = 0;

    render() {
        return html`
        <ion-header>
            <ion-toolbar>
                <ion-title>Messung</ion-title>
                <ion-buttons slot="primary">
                    <ion-button @click=${this.close}>
                        <ion-icon slot="icon-only" name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <div class="ion-padding modal">
            <ion-item>
                <ion-label position="floating">Gewicht</ion-label>
                <ion-input min=0 max=500 autofocus id="numberInput" type="number" value="0"></ion-input>
            </ion-item>
            
        </div>
        <ion-button @click=${this.newMeasurement} color="success" expand="full" class="measurementButton">Messung eintragen!</ion-button>
        `
    }

    // Ionic Bug with autofocus https://github.com/ionic-team/ionic-framework/issues/18132
    // firstUpdated() {
    //     const input = this.querySelector('#numberInput') as HTMLInputElement;
    //     setTimeout(() => {
    //         input.focus();
    //     }, 1000);
    // }

    close() {
        this.modal!.dismiss();
    }

    async newMeasurement() {
        const input = this.querySelector('#numberInput') as HTMLInputElement;
        try {
            const measurement = await measurementService.service.create({
                user: store.getState().user?._id,
                date: new Date().getTime(),
                weight: parseFloat(input.value)
            });
            console.log(measurement);
            store.dispatch(addMeasurement({_id: measurement._id, date: measurement.date, weight: measurement.weight}));
            this.close();
        } catch(e) {
            const alert = await window.alertController.create({
                header: 'Messung fehlgeschlagen',
                message: 'Leider hat die Messung nicht funktioniert. Versuchen Sie es später erneut.',
                buttons: ['Ok']
            });
            await alert.present();
            console.error(e);
            this.close();
        }
    }
}