import React, { Fragment } from 'react';
import { Router } from '@reach/router';
/** importing our pages */
import Tracks from './tracks';
import Track from './track';
import Module from './module';

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Tracks path='/apollo-odyssey' />
      <Track path='/apollo-odyssey/track/:trackId' />
      <Module path='/apollo-odyssey/track/:trackId/module/:moduleId' />
      <Tracks path='/*' />
    </Router>
  );
}
