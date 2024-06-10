import React, { Suspense } from 'react';
import { ExperienceBuilder, RenderField, useGuestContext } from '@craftercms/experience-builder/react';
import { ContentInstance } from '@craftercms/models';
import { getModel } from './lib/api';
import { BASE_URL } from './constants';
import { isAuthoring } from './utils';
import './App.css';

interface ContentProps {
  model: ContentInstance;
}

function Header(props: ContentProps) {
  const { model } = props;
  const guestContext = useGuestContext();
  const editMode = guestContext?.editMode;

  return (
    <header className="App-header">
      <RenderField model={model} fieldId="headText_s" component="p" />
      <RenderField
        model={model}
        fieldId="logo_s"
        renderTarget="src"
        component="img"
        componentProps={{
          className: `App-logo ${editMode ? '' : 'App-logo-spin'}`,
          alt: 'logo'
        }}
        render={(logo) => `${BASE_URL}${logo}`}
      />
      <RenderField model={model} fieldId="subtitle_s" component="p" />
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <div>
        <div className="App-note">
          <RenderField
            model={model}
            fieldId="body_html"
            renderTarget="dangerouslySetInnerHTML"
            render={(value) => ({ __html: value })}
          />
        </div>
      </div>
    </header>
  );
}

function App() {
  const [model, setModel] = React.useState<ContentInstance>();

  React.useEffect(() => {
    getModel().subscribe((model) => {
      setModel(model instanceof Array ? model[0] : model);
    });
  }, []);

  return (
    <Suspense fallback={<div />}>
      <div className="App" role="main">
        {model && (
          <ExperienceBuilder isAuthoring={isAuthoring()} path={model.craftercms?.path}>
            <Header model={model} />
          </ExperienceBuilder>
        )}
      </div>
    </Suspense>
  );
}

export default App;
