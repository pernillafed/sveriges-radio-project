import { createContext, useEffect, useState } from 'react';

export const ProgramContext = createContext();

const ProgramContextProvider = (props) => {

    const [programs, setPrograms] = useState(null);

    useEffect(() => {
        getAllPrograms();
    }, []);

    const getAllPrograms = async () => {
        let programs = await fetch("/api/v1/programs");
        programs = await programs.json();
        setPrograms(programs);
    };

    const values = {
        programs
    };

    return (
        <ProgramContext.Provider value={values}>
            {props.children}
        </ProgramContext.Provider>
    );

}

export default ProgramContextProvider;