import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonImg,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React from 'react';
import './Tab1.css';
import { useNewsService } from '../services/news.service';
import 'react-multi-carousel/lib/styles.css';
import { CarouselComponent } from '../components/Carousel.component';
import { CardSkeletonComponent } from '../components/CardSkeleton.component';
import { Article, TopHeadlines } from '../models/TopHeadlines.model';
import { FormatDate } from '../helpers/date-format';

type NewsRowProps = {
  isLoading: boolean;
  data: TopHeadlines;
};

const Tab1: React.FC = () => {
  const { data, loading } = useNewsService({ country: 'mx' });
  let count = 1,
    numCols = '4';

  const NewsRow: React.FC<NewsRowProps> = ({ isLoading, data }) => {
    const { articles } = data || {};
    const arr =
      isLoading && !data ? [...Array(20)] : articles.slice(4, articles.length);
    return (
      <IonRow>
        {arr.map((article: Article, index: number) => {
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
              {isLoading ? (
                <CardSkeletonComponent isImg={true}></CardSkeletonComponent>
              ) : (
                <div key={index}>
                  <IonCard className='welcome-card trend-card'>
                    <IonImg
                      src={article.urlToImage || '/assets/shapes.svg'}
                      onIonError={(err: any) =>
                        (err.srcElement.src = '/assets/shapes.svg')
                      }
                    ></IonImg>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        {article.source.name} |
                        <span> {FormatDate(article.publishedAt)}</span>
                      </IonCardSubtitle>
                      <IonItem className='ion-no-padding' lines={'none'}>
                        <IonLabel className='ion-text-nowrap'>
                          {article.title}
                        </IonLabel>
                      </IonItem>
                    </IonCardHeader>
                    <IonCardContent style={{ paddingTop: '0%' }}>
                      <p className='wrap-text-2lines'>{article.description}</p>
                    </IonCardContent>
                  </IonCard>
                </div>
              )}
            </IonCol>
          );
        })}
      </IonRow>
    );
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        {loading ? (
          <>
            <CarouselComponent>
              {[...Array(4)].map((trending: any, index: number) => (
                <div key={index}>
                  <CardSkeletonComponent isImg={true} />
                </div>
              ))}
            </CarouselComponent>
            <h2>Noticias</h2>
            <IonGrid>
              <NewsRow isLoading={true} data={data} />
            </IonGrid>
          </>
        ) : (
          <h1>Tendencias</h1>
        )}

        {/* top */}
        {!loading && data && (
          <>
            <CarouselComponent>
              {data.articles
                .slice(0, 4)
                .map((article: Article, index: number) => (
                  <div key={index}>
                    <IonCard className='welcome-card trend-card'>
                      <IonImg
                        src={article.urlToImage || '/assets/shapes.svg'}
                        onIonError={(err: any) =>
                          (err.srcElement.src = '/assets/shapes.svg')
                        }
                      ></IonImg>
                      <IonCardHeader>
                        <IonCardSubtitle>
                          {article.source.name} |
                          <span> {FormatDate(article.publishedAt)}</span>
                        </IonCardSubtitle>
                        <IonItem className='ion-no-padding' lines={'none'}>
                          <IonLabel className='ion-text-nowrap'>
                            {article.title}
                          </IonLabel>
                        </IonItem>
                      </IonCardHeader>
                      <IonCardContent style={{ paddingTop: '0%' }}>
                        <p>
                          <span className='wrap-text-2lines'>
                            {article.description}
                          </span>
                          
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </div>
                ))}
            </CarouselComponent>
            <h2>Noticias</h2>
            <IonGrid>
              <NewsRow isLoading={false} data={data} />
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
