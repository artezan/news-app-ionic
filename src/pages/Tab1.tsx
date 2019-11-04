import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonSlides,
  IonSlide,
  isPlatform,
  IonHeader,
  IonToggle,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import React, { useState, useContext, useEffect, useRef } from 'react';
import './Tab1.css';
import { useNewsService } from '../services/news.service';
import 'react-multi-carousel/lib/styles.css';
import { NewsSkeleton } from '../components/NewsSkeleton';
import { Article, TopHeadlines } from '../models/TopHeadlines.model';
import { FormatDate } from '../helpers/date-format';
import { ModalComponent } from '../components/Modal.component';
import ScrollContext from '../context/scroll.context';
import { NewsAll } from '../components/NewsAll';
import { CardSkeletonComponent } from '../components/CardSkeleton.component';
import { RefresherEventDetail } from '@ionic/core';


const Tab1: React.FC = () => {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 18;
  // hooks
  const [time, setTime] = useState(new Date().getTime());

  const { data, loading } = useNewsService({ country: 'mx', time });
  const [showModal, setShowModal] = useState(false);
  const [articleModal, setArticleModal] = useState();
  const [isDark, setIsDark] = useState(!isDayTime);
  const scrollContext = useContext(ScrollContext);
  const [eventRefresh, setEventRefresh] = useState();


  const slideOpts = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    touchRatio: 1
  };
  const isMobile = !isPlatform('tablet') && !isPlatform('desktop');

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, []);
  useEffect(() => {
    if (!loading && eventRefresh !== undefined) {
      eventRefresh.detail.complete();
    }
  }, [loading]);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setEventRefresh(event);
    /* const canRefresh = (new Date().getTime() - startTime) / 60000 > 15;
    console.log(canRefresh);
    if (canRefresh) {
      setTime(new Date().getTime());
    } else {
      event.detail.complete();
    } */
    setTime(new Date().getTime());
  };

  return (
    <IonPage>
      {showModal && (
        <ModalComponent
          showModal={showModal}
          onDidDismiss={() => {
            setShowModal(false);
          }}
          isFullModal={true}
          data={articleModal}
        ></ModalComponent>
      )}
      <IonHeader></IonHeader>
      <IonContent className='ion-padding'>
        <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {/* top */}
        <div className='toggle-box'>
          <IonToggle
            checked={isDark}
            onIonChange={ev => {
              setIsDark(ev.detail.checked);
              document.body.classList.toggle('dark', ev.detail.checked);
            }}
          ></IonToggle>
          <IonImg
            className='img-toggle'
            src={isDark ? '/assets/moon.svg' : '/assets/sun.svg'}
          ></IonImg>
        </div>

        <h1>Tendencias</h1>
        {!loading && data && (
          <>
            <IonSlides options={slideOpts}>
              {data.articles
                .slice(0, 4)
                .map((article: Article, index: number) => (
                  <IonSlide key={index}>
                    <IonCard
                      className='welcome-card trend-card'
                      button={true}
                      type={'button'}
                      onClick={() => {
                        setArticleModal(article);
                        setShowModal(true);
                      }}
                    >
                      <IonImg
                        src={article.urlToImage || '/assets/newspaper.svg'}
                        onIonError={(err: any) =>
                          (err.srcElement.src = '/assets/newspaper.svg')
                        }
                      ></IonImg>
                      {isMobile ? (
                        <>
                          <IonCardHeader>
                            <IonCardSubtitle>
                              {article.source.name} |
                              <span> {FormatDate(article.publishedAt)}</span>
                              <span> {FormatDate(article.publishedAt)}</span>
                              <span> #{index + 1}</span>
                            </IonCardSubtitle>
                            <IonItem className='ion-no-padding' lines={'none'}>
                              <h6>{article.title}</h6>
                            </IonItem>
                          </IonCardHeader>
                        </>
                      ) : (
                        <>
                          <IonCardHeader>
                            <IonCardSubtitle>
                              {article.source.name} |
                              <span> {FormatDate(article.publishedAt)}</span>
                              <span> #{index + 1}</span>
                            </IonCardSubtitle>
                            <IonItem className='ion-no-padding' lines={'none'}>
                              <h6 className='wrap-title-2lines'>
                                {article.title}
                              </h6>
                            </IonItem>
                          </IonCardHeader>
                          <IonCardContent style={{ paddingTop: '0%' }}>
                            <p className='wrap-text-2lines'>
                              {article.description}
                            </p>
                          </IonCardContent>
                        </>
                      )}
                    </IonCard>
                  </IonSlide>
                ))}
            </IonSlides>
            {/* general news */}
            <h1>Noticias</h1>

            <NewsAll
              articles={data.articles.slice(4, data.articles.length)}
              setShowModal={setShowModal}
              setArticleModal={setArticleModal}
              isMobile={isMobile}
            ></NewsAll>
          </>
        )}
        {/* Skeletons */}
        {loading && (
          <>
            <IonSlides options={slideOpts}>
              {[...Array(4)].map((trending: any, index: number) => (
                <IonSlide key={index}>
                  <CardSkeletonComponent isImg={true} />
                </IonSlide>
              ))}
            </IonSlides>
            <h2>Noticias</h2>
            <NewsSkeleton></NewsSkeleton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
