/**
 * Loader for the community's code chunks.
 */

import LoadingIndicator from 'components/LoadingIndicator';
import path from 'path';
import PT from 'prop-types';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { requireWeak, resolveWeak, SplitRoute } from 'utils/router';

export default function ChunkLoader({ base, member, meta }) {
  return (
    <SplitRoute
      cacheCss
      chunkName="blockchain-community"
      renderClientAsync={() =>
        import(
          /* webpackChunkName: "blockchain-community" */
          './Routes',
        ).then(({ default: Routes }) => (
          <Routes base={base} member={member} meta={meta} />
        ))
      }
      renderPlaceholder={() => <LoadingIndicator />}
      renderServer={(routeProps) => {
        const p = resolveWeak('./Routes');
        const Routes = requireWeak(path.resolve(__dirname, p));
        return (
          <StaticRouter
            context={routeProps.staticContext}
            location={routeProps.location.pathname}
          ><Routes base={base} member={member} meta={meta} /></StaticRouter>
        );
      }}
    />
  );
}

ChunkLoader.propTypes = {
  base: PT.string.isRequired,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
