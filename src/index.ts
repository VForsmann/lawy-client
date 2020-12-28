// init ionic
import "@ionic/core/css/ionic.bundle.css";
import { defineCustomElements } from "@ionic/core/loader"; 

import { alertController } from '@ionic/core';

declare global {
    interface Window { alertController: typeof alertController }
}

defineCustomElements(window).then(() => {
    window.alertController = alertController;
});




// scss
import './index.scss';

import './components/root/lawy-root';
import './components/eintraege/lawy-eintraege';
import './components/eintraege/lawy-eintrag';
import './components/login/lawy-login';
import './components/register/lawy-register';
import './components/profil/lawy-profil';
import './components/eintraege/lawy-neuer-eintrag';

