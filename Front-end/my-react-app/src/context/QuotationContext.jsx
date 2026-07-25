import { createContext, useContext, useState, useEffect } from "react";

const QuotationContext = createContext(null);

export function QuotationProvider({ children }) {
    const [step, setStep] = useState(1);
    const [quotationData, setQuotationData] = useState({
        containers: [],
        customerInfo: {},
        additionalInfo: {},
    });


    useEffect(() => {
        console.log("Quotation data updated:", quotationData);
    }, [quotationData]);

    const value = {
        step,
        setStep,
        quotationData,
        setQuotationData,
    };

    const handleUpdateStep = (newStep) => {
        if (newStep < 1) newStep = 1;
        if (newStep > 3) newStep = 3;
        setStep(newStep);
    }

    return (
        <QuotationContext.Provider value={{step, handleUpdateStep}}>
            {children}
        </QuotationContext.Provider>
    );
}

export function useQuotation() {
    return useContext(QuotationContext);
}
