import React from 'react';
import { renderToString } from 'react-dom/server';
import { Dropdown } from './components/ui/dropdown';

console.log(renderToString(<Dropdown label="Test" options={["1", "2"]} />));
