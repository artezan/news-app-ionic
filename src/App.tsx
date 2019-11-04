import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  setupConfig,
  IonButton,
  IonButtons} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { paper, list, search } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/Details';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/general.css';

import {ScrollProvider} from './context/scroll.context'

setupConfig({
  rippleEffect: false,
  mode: 'ios',
  hardwareBackButton: true,
  swipeBackEnabled: false
});

const App: React.FC = () => (
  /*  <IonApp>
    <IonReactRouter>
      <IonTabs >
        <IonRouterOutlet>
          <Route path='/tab1' component={Tab1} exact={true} />
          <Route path='/tab2' component={Tab2} exact={true} />
          <Route path='/tab2/details' component={Details} />
          <Route path='/tab3' component={Tab3} />
          <Route path='/' render={() => <Redirect to='/tab1' />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar translucent={true}  slot='bottom'>
          <IonTabButton tab='tab1' href='/tab1'>
            <IonIcon icon={flash} />
            <IonLabel>Tab One</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab2' href='/tab2'>
            <IonIcon icon={apps} />
            <IonLabel>Tab Two</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab3' href='/tab3'>
            <IonIcon icon={send} />
            <IonLabel>Tab Three</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp> */

  <IonApp>
    <ScrollProvider  >
      <div className='wraper-app'>
        <div className='router-cont'>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path='/tab1' component={Tab1} exact={true} />
              <Route path='/tab2' component={Tab2} exact={true} />
              <Route path='/tab2/details/:id' component={Details} />
              <Route path='/tab3' component={Tab3} />
              <Route
                path='/'
                render={() => <Redirect to='/tab1' />}
                exact={true}
              />
            </IonRouterOutlet>
            <div className='bar-cont'>
              <div className='flex-cont'>
                <IonButtons className='flex-btns'>
                  <IonButton routerLink='/tab1' routerDirection={'none'}>
                    <IonIcon color='primary' slot='icon-only' icon={paper} />
                  </IonButton>
                  <IonButton routerLink='/tab2' routerDirection={'none'}>
                    <IonIcon color='primary' slot='icon-only' icon={list} />
                  </IonButton>
                  <IonButton routerLink='/tab3' routerDirection={'none'}>
                    <IonIcon color='primary' slot='icon-only' icon={search} />
                  </IonButton>
                </IonButtons>
              </div>
            </div>
          </IonReactRouter>
        </div>
      </div>
    </ScrollProvider>
  </IonApp>
);

export default App;
