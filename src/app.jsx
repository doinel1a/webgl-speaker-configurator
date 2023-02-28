import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GithubCorner from './components/github-corner';
import Viewer from './components/viewer';

function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen flex-col items-center justify-center bg-secondary p-2 text-color sm:p-4 md:p-6 lg:p-10'>
        <Viewer />
        <GithubCorner
          title='Get started on GitHub'
          url='https://github.com/doinel1a/vite-react-js-starter'
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
