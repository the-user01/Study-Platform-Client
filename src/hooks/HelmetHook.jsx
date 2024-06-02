import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetHook = ({name}) => {

    return (
        <Helmet>
            <title>Knowledge Jutsu | {name}</title>
        </Helmet>
    );
};

export default HelmetHook;