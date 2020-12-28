import { modalController } from "@ionic/core";
import { customElement, html, LitElement, property } from "lit-element";
import { NoShadowMixin } from "../../client-packages/no-shadow/noshadow.mixin";
import { PageMixin } from "../../client-packages/page-mixin/page.mixin";
import { router } from "../../client-packages/router/router";
import { Measurement } from "../../interfaces/measurement.interface";
import { State } from "../../interfaces/state.interface";
import { addMeasurements } from "../../redux/actions/measurements.actions";
import { store } from "../../redux/store";
import MeasurementService from "../../services/measurement.service";
import './eintraege.scss';


@customElement('lawy-eintraege')
class LawyEintraege extends PageMixin(LitElement) {
    @property() measurements: Array<Measurement> = [];


    stateChanged(state: State) {
        this.measurements = state.measurements;
        this.requestUpdate();
    }

    render() {
        this.measurements = this.measurements.map((measurement: Measurement, index: number) => {
            const before = this.measurements[index-1];
            let symbol = "neutral";
            if(before) {
                if(before.weight > measurement.weight) {
                    symbol = "positive";
                } else if(before.weight === measurement.weight) {
                    symbol = "neutral";
                } else {
                    symbol = "negative";
                }
            } else {
                symbol = "neutral";
            };
            return {...measurement, symbol: symbol};
        }).reverse();
        return html`
        <ion-content class="content">
            ${this.measurements.length > 0 ? this.renderMeasurements() : 
            html`
                <p class="text-center">Noch keine Messungen vorgenommen!</p>
            `}
            
        </ion-content>
        <ion-button @click=${this.newMeasurement} color="success" expand="full" class="measurementButton">Neue Messung</ion-button>
        `
    }

    renderMeasurements() {
        return html`
        <ion-list lines="full" class="ion-padding">
        <ion-item>
            <lawy-eintrag symbol="Status" fett=true datum="Datum" gewicht="Gewicht"></lawy-eintrag>
        </ion-item>

        ${this.measurements.map(measurement => {
            return html`<ion-item><lawy-eintrag symbol="${measurement.symbol}" datum="${new Date(measurement.date).toLocaleDateString()} ${new Date(measurement.date).toLocaleTimeString()}" gewicht="${measurement.weight}"></lawy-eintrag></ion-item>`
        })}
        
        </ion-list>
        
    `
    }

    async firstUpdated() {
        const measurements = (await MeasurementService.measurementService.find({query: {
            $limit: 1000000,
            user: store.getState().user?._id
        }})).data.map((measurement: Measurement) => {
            return {_id: measurement._id, date: measurement.date, weight: measurement.weight};
        });
        if(measurements) {
            store.dispatch(addMeasurements(measurements));
        }
    }

    newMeasurement() {
        const modal = document.createElement("ion-modal");
        modal.component = 'lawy-neuer-eintrag';
        modal.componentProps = {
            'lastWeight': 0
          };
        document.body.appendChild(modal);
        return modal.present();
    }
}