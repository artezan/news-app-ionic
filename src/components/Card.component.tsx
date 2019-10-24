import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton
} from '@ionic/react';

const CardComponent: React.FC = () => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit
          clean.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonItem>
          <IonIcon name='pin' slot='start' />
          <IonLabel>ion-item in a card, icon left, button right</IonLabel>
          <IonButton fill='outline' slot='end'>
            View
          </IonButton>
        </IonItem>

        <IonCardContent>
          This is content, without any paragraph or header tags, within an
          ion-cardContent element.
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default CardComponent;
