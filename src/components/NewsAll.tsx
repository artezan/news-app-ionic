import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
  IonItem,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React from 'react';
import { CardSkeletonComponent } from './CardSkeleton.component';
import { Article } from '../models/TopHeadlines.model';
import { FormatDate } from '../helpers/date-format';
import '../pages/Tab1.css';

export const NewsAll = (props: any) => {
  let count = 1,
    numCols = '4';
  return (
    <IonGrid>
      <IonRow>
        {props.articles
          .map((article: Article, index: number) => {
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
                {
                  <div key={index}>
                    <IonCard
                      className={
                        props.isMobile
                          ? 'welcome-card-phone trend-card-phone'
                          : 'welcome-card trend-card'
                      }
                      button={true}
                      type={'button'}
                      onClick={() => {
                        console.log('card', article);
                        props.setArticleModal(article);
                        props.setShowModal(true);
                      }}
                    >
                      <IonImg
                        src={article.urlToImage || '/assets/newspaper.svg'}
                        onIonError={(err: any) =>
                          (err.srcElement.src = '/assets/newspaper.svg')
                        }
                      ></IonImg>

                      <IonCardHeader>
                        <IonCardSubtitle>
                          {article.source.name} |
                          <span> {FormatDate(article.publishedAt)}</span>
                        </IonCardSubtitle>
                        <IonItem className='ion-no-padding' lines={'none'}>
                          <h6
                            className={
                              props.isMobile ? '' : 'wrap-title-2lines'
                            }
                          >
                            {article.title}
                          </h6>
                        </IonItem>
                      </IonCardHeader>
                      <IonCardContent
                        style={{
                          paddingTop: '0%'
                        }}
                      >
                        <p className={props.isMobile ? '' : 'wrap-text-2lines'}>
                          {article.description}
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </div>
                }
              </IonCol>
            );
          })}
      </IonRow>
    </IonGrid>
  );
};
