import { customElement, html, LitElement, query } from "lit-element";
import { NoShadowMixin } from "../../client-packages/no-shadow/noshadow.mixin";
import { router } from "../../client-packages/router/router";
import { userLogin } from "../../redux/actions/user.actions";
import { store } from "../../redux/store";
import UserService from "../../services/user.service";
import './lawy-register.scss';

@customElement('lawy-register')
class LawyRegister extends NoShadowMixin(LitElement) {

    @query("form")
    form!: HTMLFormElement;

    @query("#email")
    email!: HTMLInputElement;

    @query("#password")
    password!: HTMLInputElement;

    @query("#passwordCheck")
    passwordCheck!: any;

    render() {
        return html`
        
        <ion-list lines="full" class="ion-no-margin middle fullscreen mt-100">
            <form>
            <ion-item>
                <ion-label position="stacked">E-Mail</ion-label>
                <ion-input autofocus id="email" required type="email" placeholder="test@example.de"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Passwort</ion-label>
                <ion-input id="password" minlength=6 maxlength=20 required type="password" placeholder="*********"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Passwort-Wiederholung</ion-label>
                <ion-input id="passwordCheck" minlength=6 maxlength=20 required type="password" placeholder="*********"></ion-input>
            </ion-item>
        
            <div class="horizontal-flex justify-flex-end w-100 ion-padding-end ion-padding-top">
                <ion-button @click=${this.register} size="small" color="success">Register</ion-button>
                <ion-button @click=${() => router.navigate("login")} size="small" color="medium">Login</ion-button>
            </div>
            </form>
        </ion-list>
        `
    }

    async firstUpdated() {
        this.addEventListener("keyup", (event) => {
            if(event.key !== "Enter") return;
            event.preventDefault();
            this.register();
        });

        const inputElement = (await this.passwordCheck.getInputElement() as HTMLInputElement);
        
    }

    async register() {

        const passwordCheckInput = (await this.passwordCheck.getInputElement() as HTMLInputElement);
        if(this.password.value === this.passwordCheck.value) {
            passwordCheckInput.setCustomValidity("");
            const valid = this.form.reportValidity();
            if(valid) {
                try {
                    await UserService.service.create({email: this.email.value, password: this.password.value});
                    const userData = (await UserService.login({
                        email:this.email.value,
                        password: this.password.value
                    })).user;
                    store.dispatch(userLogin({_id: userData._id, email: userData.email}));
                    router.navigate("eintraege");
                } catch(e) {
                    console.error(e);
                    const alert = await window.alertController.create({
                        header: 'Registrierung fehlgeschlagen',
                        message: 'Leider hat die Registrierung nicht funktioniert. Versuchen Sie es später erneut.',
                        buttons: ['Ok']
                    });
                    await alert.present();
    
                }
            }
        } else {
            console.log("invalid", this.password.value, this.passwordCheck.value)
            passwordCheckInput.setCustomValidity("Die Passwörter stimmen nicht überein!");
            passwordCheckInput.reportValidity();
        }
    }
}