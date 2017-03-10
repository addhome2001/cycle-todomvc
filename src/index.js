import Cycle from '@cycle/rxjs-run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

import main from './main';

require('./assets/css/app.scss');

Cycle.run(main, {
  DOM: makeDOMDriver('#app_container'),
  HTTP: makeHTTPDriver(),
});
