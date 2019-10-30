import {
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React from 'react';
import { CardSkeletonComponent } from './CardSkeleton.component';
import { Article } from '../models/TopHeadlines.model';

export const NewsSkeleton = () => {
  let count = 1,
    numCols = '4';
  return (
    <IonGrid>
      <IonRow>
        {[...Array(20)].map((article: Article, index: number) => {
          if (count !== 1) {
            numCols = numCols === '4' ? '8' : '4';
          }
          count = count + 1;
          count = count === 3 ? 1 : count;
          return (
            <IonCol
              key={`n-${index}`}
              sizeLg={numCols}
              sizeMd={numCols}
              sizeSm='12'
              sizeXs='12'
            >
              <CardSkeletonComponent isImg={true} ></CardSkeletonComponent>
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};
