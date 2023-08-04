import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    // state para validaciones del formulario
    const [ formValidation, setFormValidation] = useState({});


    useEffect(() => {
        createValidators();
    }, [formState]);

    // se vuelve a ejecutar cuando los valores del initialForm cambian (cuando cambia la nota)
    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm])
    
    
    // useMemo
    const isFormValid = useMemo(() => {
        for( const formValue of Object.keys( formValidation ) ){
            if( formValidation[formValue] !== null ) return false;
        }
        return true;   
    }, [ formValidation ]);
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    // funcion para la validación del formulario
    // clase 280
    const createValidators = () => {

        const formCheckedValues = {};

        for( const formField of Object.keys( formValidations ) ){
            // de obtiene la funcion y el mensaje del error
            const [ fn, errorMessage ] = formValidations[ formField ];
            // si se cumple = true - null / sino se cumple = false - errorMessage
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        // cambiamos el estado
        setFormValidation( formCheckedValues );
        //console.log({ formCheckedValues })

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}