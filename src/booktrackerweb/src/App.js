// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { BookList, BookShow } from './books';

const App = () => (
    <Admin restClient={jsonServerRestClient('http://localhost:8080/api/')}>
        <Resource name="book" list={BookList} show={BookShow} />
    </Admin>
);

export default App;