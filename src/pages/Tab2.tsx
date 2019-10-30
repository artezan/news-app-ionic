import React from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonText
} from '@ionic/react';

const Tab2: React.FC = () => {
  const categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonText>
          <h1>Selecciona una</h1>
        </IonText>
        
        <IonGrid >
          <IonRow>
            {categories.map((category: string, index: number) => (
              <IonCol key={index}>
                <IonCard
                  button={true}
                  routerLink={'/tab2/details/' + category}
                >
                  <IonCardHeader>
                    <IonCardTitle className='ion-text-capitalize'>
                      {category}
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
