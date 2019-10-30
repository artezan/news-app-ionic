import React, { createContext, useState } from 'react';
type ScrollContextProps = {
  scrollTop?: number;
  setScrollTop?: any;
};
const ScrollContext = createContext<ScrollContextProps>({});

export let ScrollProvider: any = (props: any) => {
  const { scrollTop: scrollTopInput, children } = props;

  // Use State to keep the values
  const [scrollTop, setScrollTop] = useState(scrollTopInput);

  // Make the context object:
  const scrollContextProvider = {
    scrollTop,
    setScrollTop
  };
  // pass the value in provider and return
  return (
    <ScrollContext.Provider value={scrollContextProvider}>
      {children}
    </ScrollContext.Provider>
  );
};
export const ScrollConsumer = ScrollContext.Consumer;
export default ScrollContext;
