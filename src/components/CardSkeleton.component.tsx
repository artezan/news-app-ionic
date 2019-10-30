import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonThumbnail,
  IonSkeletonText
} from '@ionic/react';

type CardSkeletonProps = {
  isImg: boolean;
};

export const CardSkeletonComponent: React.FC<CardSkeletonProps> = ({
  isImg
}) => (
  <>
    <IonCard className='welcome-card'>
      {isImg && (
        <IonItem lines='none' style={{ width: '500px' }}>
          <IonThumbnail style={{ width: '100%', height: '100px' }} slot='start'>
            <IonSkeletonText animated />
          </IonThumbnail>
        </IonItem>
      )}

      <IonCardHeader>
        <IonCardSubtitle>
          <IonSkeletonText animated style={{ width: '20%' }} />
        </IonCardSubtitle>
        <IonCardTitle>
          <IonSkeletonText animated style={{ width: '30%' }} />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          <IonSkeletonText animated style={{ width: '60%' }} />
          <IonSkeletonText animated />
          <IonSkeletonText animated style={{ width: '88%' }} />
          <IonSkeletonText animated style={{ width: '70%' }} />
          <IonSkeletonText animated style={{ width: '60%' }} />
        </p>
      </IonCardContent>
    </IonCard>
  </>
);
