import React from 'react';
import ModulePreview from '../components/ModulePreview';
import '../style/ModuleList.scss';

const ModuleList = (props) => {
  return (
    <div className='module-list'>
      <div className='module-container'>
        {props.modules.map((module, index) => {
          const description = module.description
            ? module.description.substring(0, 160)
            : 'No Description';
          return (
            <div key={index} className='preview-container'>
              <ModulePreview
                title_link={`/module/display/${module.author}/${module.module_id}`}
                num_star={module.num_star}
                cover_image='https://avatars.githubusercontent.com/u/33727687?s=460&u=7fd97fe40129bdebcfc0bbccc75657735969e5e5&v=4'
                title={module.title}
                subheader={module.author}
                // description='https://avatars.githubusercontent.com/u/33727687?s=460&u=7fd97fe40129bdebcfc0bbccc75657735969e5e5&v=4'
                description={description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleList;
