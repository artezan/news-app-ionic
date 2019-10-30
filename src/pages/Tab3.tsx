import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonSearchbar,
  isPlatform,
  IonButton
} from '@ionic/react';
import { useSearchService } from '../services/search.service';
import { match } from 'react-router-dom';
import { NewsAll } from '../components/NewsAll';
import { NewsSkeleton } from '../components/NewsSkeleton';
import { ModalComponent } from '../components/Modal.component';


const Tab3Page: React.FC = () => {
  // hooks

  const [q, setQ] = useState('');
  const { data, loading, error } = useSearchService({
    q
  });
  const [showModal, setShowModal] = useState(false);
  const [articleModal, setArticleModal] = useState();
  const isMobile = true;
  let words: string, ref: any;

  const handlerInput = () => {
    words = ref.value;
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
      <IonContent className='ion-padding'>
        {/*-- Animated Searchbar --*/}
        <IonSearchbar
          animated={true}
          showCancelButton='focus'
          placeholder='Buscar por palabras'
          ref={c => (ref = c)}
          onIonInput={() => handlerInput()}
        ></IonSearchbar>
        <IonButton onClick={() => setQ(words)}>Buscar</IonButton>
        {/* top */}
        
        {!loading && data && (
          <>
          <h1 className='ion-text-capitalize'> Resultados</h1>
            {/* general news */}

            <NewsAll
              articles={data.articles}
              setShowModal={setShowModal}
              setArticleModal={setArticleModal}
              isMobile={isMobile}
            ></NewsAll>
          </>
        )}
        {/* Skeletons */}
        {loading && (
          <>
            <h2>Buscando ...</h2>
            <NewsSkeleton></NewsSkeleton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
