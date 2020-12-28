import { customElement, html, LitElement, property } from "lit-element";
import { PageMixin } from "../../client-packages/page-mixin/page.mixin";
import { router } from "../../client-packages/router/router";
import { State } from "../../interfaces/state.interface";
import { User } from "../../interfaces/user.interface";
import { userLogout } from "../../redux/actions/user.actions";
import { store } from "../../redux/store";
import userService from "../../services/user.service";
import './lawy-profil.scss';

@customElement('lawy-profil')
class LawyProfil extends PageMixin(LitElement) {
    @property() user: User | undefined = undefined;
    @property() shouldChangePassword: Boolean = false;

    stateChanged(state: State) {
        this.user = state.user;
    }

    render() {
        return html`
        
        <div class="ion-padding profile">
            <h1>Hey ${this.user?.email}!</h1>
            <p>Diese App hat keine weiteren Daten von dir gespeichert. Du kannst dich aber ausloggen oder dein Passwort
                ändern!</p>
            <div class="horizontal-flex justify-flex-center w-100 ion-padding-end ion-padding-top">
                <ion-button @click=${this.logout} size="small" color="danger">Logout</ion-button>
                <ion-button @click=${() => this.shouldChangePassword = !this.shouldChangePassword} size="small"
                    color="medium">Passwort ändern</ion-button>
            </div>
            ${this.shouldChangePassword ? this.renderPasswordChange() : ''}
        </div>
        `
    }

    renderPasswordChange() {
        return html`
        <hr>
        <ion-list lines="full" class="ion-no-margin middle fullscreen mt-100">
            <form>
                <ion-item>
                    <ion-label position="floating">Neues Passwort</ion-label>
                    <ion-input id="password" minlength=6 maxlength=20 required type="password" placeholder="*********">
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Password-Wiederholung</ion-label>
                    <ion-input id="passwordCheck" minlength=6 maxlength=20 required type="password" placeholder="*********">
                    </ion-input>
                </ion-item>
                <div class="horizontal-flex justify-flex-center w-100 ion-padding-end ion-padding-top">
                    <ion-button @click=${this.changePassword} size="small" color="success">Passwort ändern</ion-button>
                </div>
            </form>
        </ion-list>
        `
    }

    async logout() {
        try {
            await userService.logout();
            store.dispatch(userLogout());
            router.navigate("login");
        } catch (e) {
            console.error(e);
            const alert = await window.alertController.create({
                header: 'Logout fehlgeschlagen',
                message: 'Leider hat der Logout nicht funktioniert. Bitte versuche es später erneut.',
                buttons: ['Ok']
            });
            await alert.present();
        }
    }

    async changePassword() {
        const passwordCheckInput = await (document.querySelector("#passwordCheck") as any).getInputElement();
        const passwordElement = await (document.querySelector("#password") as any).getInputElement();
        if (passwordCheckInput.value !== passwordElement.value) {
            (passwordCheckInput as HTMLInputElement).setCustomValidity("Die Passwörter stimmen nicht überein!");
            await (document.querySelector("form") as HTMLFormElement).reportValidity();
        } else {
            (passwordCheckInput as HTMLInputElement).setCustomValidity("");
            const valid = (document.querySelector("form") as HTMLFormElement).reportValidity();
            if (valid) {
                try {
                    userService.service.patch(this.user?._id, {
                        password: passwordElement.value
                    });
                    const alert = await window.alertController.create({
                        header: 'Passwort geändert!',
                        message: 'Bitte loggen Sie sich neu ein!',
                        buttons: ['Ok']
                    });
                    await alert.present();
                    await userService.logout();
                    router.navigate("login");
                } catch (e) {
                    const alert = await window.alertController.create({
                        header: 'Fehler',
                        message: 'Das hat leider nicht funktioniert. Bitte versuchen Sie es später erneut.',
                        buttons: ['Ok']
                    });
                    await alert.present();
                }
            }
        }
    }
}