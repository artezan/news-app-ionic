import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonImg,
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  isPlatform
} from '@ionic/react';
import './Modal.css';
import { Article } from '../models/TopHeadlines.model';
import { FormatDate } from '../helpers/date-format';
import { arrowDown } from 'ionicons/icons';
type ModalComponentProps = {
  showModal: boolean;
  onDidDismiss: any;
  isFullModal?: boolean;
  data: Article;
};

declare var history: any;

export const ModalComponent: React.FC<ModalComponentProps> = ({
  showModal: showModalInput,
  onDidDismiss,
  isFullModal,
  data: dataInput
}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Article>(dataInput);

  useEffect(() => {
    history.pushState(null, 'null', window.location.href);
    window.onpopstate = () => {
      setShowModal(false);
      history.go(1);
    };
    /* window.onpopstate = (e: any) => {
      e.preventDefault();
      console.log('back');
      setShowModal(false);
      history.pushState(null, '', null);
      return;
    }; */
    /*  window.onbeforeunload = (e: any) => {
      e.preventDefault();
      console.log('back', e);
      setShowModal(false);
      return '';
    }; */
    return () => {
      window.onpopstate = () => {};
    };
  }, []);
  useEffect(() => {
    setShowModal(showModalInput);
    setData(dataInput);
  }, [showModalInput, dataInput]);
  const isMobile = !isPlatform('tablet') && !isPlatform('desktop');
  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={onDidDismiss}
      cssClass={isFullModal ? 'full-modal' : ''}
    >
      <IonContent color='light' className='ion-padding' fullscreen={true}>
        {!isMobile ? (
          <div className='flex-box-img'>
            <IonCard className='card-shadows'>
              <IonImg
                className='img-modal'
                src={data.urlToImage || '/assets/newspaper.svg'}
                onIonError={(err: any) =>
                  (err.srcElement.src = '/assets/newspaper.svg')
                }
              ></IonImg>
            </IonCard>
          </div>
        ) : (
          <IonCard className='card-phone'>
            <IonImg
              src={data.urlToImage || '/assets/newspaper.svg'}
              onIonError={(err: any) =>
                (err.srcElement.src = '/assets/newspaper.svg')
              }
            ></IonImg>
          </IonCard>
        )}

        <h2>{data.title}</h2>
        <h5>
          {data.source.name} |<span> {FormatDate(data.publishedAt)}</span>
        </h5>
        <p>{data.content || data.description}</p>
        <div className='flex-box-btn'>
          <IonButton shape='round' href={data.url}>
            Más información
          </IonButton>
        </div>

        {/*-- fab placed to the top start --*/}
        <IonFab vertical='top' horizontal='start' slot='fixed'>
          <IonFabButton onClick={() => setShowModal(false)}>
            <IonIcon mode='md' icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonModal>
  );
};
