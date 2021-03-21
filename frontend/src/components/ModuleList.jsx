import React from "react";
import ModulePreview from "../components/ModulePreview";
import "../style/ModuleList.scss";

const ModuleList = (props) => {
  return (
    <div className='module-list'>
      <div className='module-container'>
        {props.modules.map((module, index) => (
          <div key={index} className='preview-container'>
            <ModulePreview
              num_star={module.num_star}
              cover_image='https://avatars.githubusercontent.com/u/33727687?s=460&u=7fd97fe40129bdebcfc0bbccc75657735969e5e5&v=4'
              title={module.title}
              subheader={module.author}
              description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleList;