import { customElement, html, LitElement, query } from "lit-element";
import { PageMixin } from "../../client-packages/page-mixin/page.mixin";
import { State } from "../../interfaces/state.interface";
import { User } from "../../interfaces/user.interface";
import { router } from "../../client-packages/router/router";
import userService from "../../services/user.service";
import { store } from "../../redux/store";
import { userLogin } from "../../redux/actions/user.actions";
import './lawy-root.scss';

@customElement('lawy-root')
class LawyRoot extends PageMixin(LitElement) {

    user: User | undefined = undefined;

    @query("#eintrag")
    eintragElement!: HTMLButtonElement;

    @query("#profil")
    profilElement!: HTMLButtonElement;

    stateChanged(state: State) {
        this.user = state.user;
        this.requestUpdate();
    }

    render() {
        return html`
        
            <ion-app>
                <ion-header translucent>
                    <ion-toolbar>
                        <ion-title>${router.getPath().toLocaleUpperCase()}</ion-title>
                    </ion-toolbar>
                </ion-header>
                ${this.renderOutlet()}
                ${this.user ? this.loggedInContent() : ''}
            </ion-app>
        `
    }

    loggedInContent() {
        // correct css classes for deep-links
        this.updateComplete.then(() => this.tabClick(router.getPath()));
        return html`
        <ion-tab-bar slot="bottom">
            <ion-tab-button @click=${()=> this.tabClick("eintraege", true)}>
                <ion-icon name="list-outline"></ion-icon>
                <ion-label id="eintrag">Einträge</ion-label>
            </ion-tab-button>
            </ion-tab-button>
            <ion-tab-button @click=${()=> this.tabClick("profil", true)}>
                <ion-icon name="person-circle-outline"></ion-icon>
                <ion-label id="profil">Profil</ion-label>
            </ion-tab-button>
        </ion-tab-bar>
    `
    }

    renderOutlet() {
        switch (router.getPath()) {
            case "login":
                return html`
                    <lawy-login></lawy-login>
                `
            case "register":
                return html`
                    <lawy-register></lawy-register>
                `
            case "profil":
                return html`
                    <lawy-profil></lawy-profil>
                `
            case "eintraege":
                return html`
                    <lawy-eintraege></lawy-eintraege>
                `
            case "neuer-eintrag":
                return html`
                    <lawy-neuer-eintrag></lawy-neuer-eintrag>
                `
            default:
                router.navigate("eintraege");
                return html`
                    <lawy-eintraege></lawy-eintraege>
                `
        }
    }

    tabClick(tab: string, navigate?: boolean) {
        const eintragElement = this.querySelector("#eintrag")?.parentElement;
        const profilElement = this.querySelector("#profil")?.parentElement;
        const elements = [eintragElement, profilElement];
        let clickedElement: HTMLButtonElement | undefined = undefined;
        switch (tab) {
            case "eintraege":
                clickedElement = eintragElement as HTMLButtonElement;
                if (navigate) router.navigate("eintraege")
                break;
            case "profil":
                clickedElement = profilElement as HTMLButtonElement;
                if (navigate) router.navigate("profil")
                break;
        }
        if (clickedElement) {
            clickedElement!.classList.add("tab-selected");
            elements.filter(element => element !== clickedElement).forEach(element => element!.classList.remove("tab-selected"));
        }

    }

    async firstUpdated() {
        router.subscribe(() => {
            this.requestUpdate();
        });
        try {
            const answer = await userService.login();
            const user = answer.user;
            console.log("REAUTHENICATED USER:", user);
            store.dispatch(userLogin({ _id: user._id, email: user.email }));
        } catch (e) {
            console.log("User not detected. Forcing manual login!");
            router.navigate("login");
        }
    }

}