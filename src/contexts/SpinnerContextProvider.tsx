import React, { useState, createContext, ReactNode } from "react";
import styles from "@/styles/Spinner.module.scss";

interface SpinnerContextType {
  showSpinner: (value: boolean) => void;
}

export const SpinnerContext = createContext<SpinnerContextType>({
  showSpinner: () => {},
});

interface SpinnerContextProviderProps {
  children: ReactNode;
}

const SpinnerContextProvider: React.FC<SpinnerContextProviderProps> = ({
  children,
}) => {
  const [spinner, setSpinner] = useState(false);

  const showSpinner = (value: boolean) => {
    setSpinner(value);
  };

  return (
    <SpinnerContext.Provider value={{ showSpinner }}>
      {spinner && (
        <div className={`${styles.spinnerContainer} ${styles.show}`}>
          <div className={`${styles.spinner}`}></div>
        </div>
      )}
      {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerContextProvider;
