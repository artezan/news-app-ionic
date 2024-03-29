import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  isPlatform} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { useCategoryService } from '../services/category.service';
import { ModalComponent } from '../components/Modal.component';
import { NewsAll } from '../components/NewsAll';
import { NewsSkeleton } from '../components/NewsSkeleton';

interface CategoryDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<CategoryDetailPageProps> = ({ match }) => {
  // hooks
  const { data, loading } = useCategoryService({
    category: match.params.id
  });
  const [showModal, setShowModal] = useState(false);
  const [articleModal, setArticleModal] = useState();
  const isMobile = !isPlatform('tablet') && !isPlatform('desktop');

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
        {/* top */}
        <h1 className='ion-text-capitalize'> {match.params.id}</h1>
        {!loading && data && (
          <>
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
            <h2>Noticias</h2>
            <NewsSkeleton></NewsSkeleton>
          </>
        )}

        {/*-- fab placed to the top start --*/}
        {/*  <IonFab vertical='top' horizontal='start' slot='fixed'>
          <IonFabButton routerLink='/tab2'>
            <IonIcon mode='md' icon={arrowBack} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default Details;
