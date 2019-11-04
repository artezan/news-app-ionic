import React from 'react';
import Carousel from 'react-multi-carousel';
import {
  isPlatform
} from '@ionic/react';

export const CarouselComponent: React.FC = ({ children }) => {
  const isDesktop = isPlatform('desktop');
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={isDesktop}
      dotListClass=''
      draggable
      focusOnSelect={false}
      itemClass=''
      keyBoardControl
      minimumTouchDrag={20}
      partialVisbile={true}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      showDots={false}
      sliderClass=''
      slidesToSlide={1}
      swipeable
    >
      {children}
    </Carousel>
  );
};


/*
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 2,
    partialVisibilityGutter: 100
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};
const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}; 
 */