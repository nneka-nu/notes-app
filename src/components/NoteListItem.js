import React, { useEffect, useState } from 'react';
import { TiFolder } from 'react-icons/ti';

const NoteListItem = ({ 
  title, 
  subtitle, 
  dateOrTime, 
  isSelected, 
  searchTerm,
  folderName, 
  onClick }) => {
  const [className, setClassName] = useState('default');
  const [showTitle, setShowTitle] = useState(false);
  const [titles, setTitles] = useState({
    titleLeft: '',
    titleRight: '',
    titleMiddle: '',
    subtitleLeft: '',
    subtitleMiddle: '',
    subtitleRight: '',
  });

  useEffect(() => {
    if (searchTerm) {
      let titleLeft = '';
      let titleRight = '';
      let titleMiddle = '';
      let subtitleLeft = '';
      let subtitleRight = '';
      let subtitleMiddle = '';
      // title
      let offset = 7;
      let maxLen = 20;
      let termIndex = title.toLowerCase().indexOf(searchTerm.toLowerCase());
      let termLen = searchTerm.length;
      let startIndex = termIndex - offset > 0 ? termIndex - offset : 0;
      let indexAfterWord = termIndex + termLen;
      if (termIndex === -1) {
        setShowTitle(true);
      } else {
        if (termLen >= offset && title.length > maxLen) {
          startIndex = termIndex;
        }
        titleLeft = title.slice(startIndex, termIndex);
        titleLeft = startIndex !== 0 ? 
          `...${titleLeft}` : 
          titleLeft;
        titleMiddle = title.slice(termIndex, indexAfterWord);
        titleRight = title.length === indexAfterWord ? '' : title.slice(indexAfterWord);
      }

      // subtitle
      termIndex = subtitle.toLowerCase().indexOf(searchTerm.toLowerCase());
      startIndex = termIndex - offset > 0 ? termIndex - offset : 0;
      if (termLen >= offset && subtitle.length > maxLen) {
        startIndex = termIndex;
      }
      subtitleLeft = subtitle.slice(startIndex, termIndex);
      subtitleLeft = startIndex !== 0 ? `...${subtitleLeft}` : subtitleLeft;
      indexAfterWord = termIndex + termLen;
      subtitleMiddle = subtitle.slice(termIndex, indexAfterWord);
      subtitleRight = subtitle.length === indexAfterWord ? '' : subtitle.slice(indexAfterWord);
      setTitles({
        titleLeft,
        titleMiddle,
        titleRight,
        subtitleLeft,
        subtitleMiddle,
        subtitleRight,
      });
      return;
    }

    setShowTitle(false);
  }, [searchTerm, title, subtitle]);

  const handleItemClick = () => {
    setClassName('selected');
    onClick();
  };

  const handleItemBlur = () => {
    setClassName('default');
  };

  return (
    <li 
      className={isSelected ? className : ''}
      onClick={handleItemClick}
      onBlur={handleItemBlur}
      tabIndex="-1"
      >
      {(!searchTerm || showTitle) && <div className="title">{title}</div>}
      {searchTerm && !showTitle &&
        <div className="title">{titles.titleLeft} 
          <span className="search-term">
            {titles.titleMiddle}
          </span>
          {titles.titleRight}
        </div>
      }
      <div className="subtitle">
        <span className="last-updated">{dateOrTime}</span> 
        {!searchTerm && <span className="text">{subtitle}</span>}
        {searchTerm && 
          <span className="text">{titles.subtitleLeft} 
            <span className="search-term">
              {titles.subtitleMiddle}
            </span>
            {titles.subtitleRight}
          </span>
        }
      </div>
      {searchTerm && 
        <div className="folder-name">
          <div className="icon"><TiFolder /></div>
          <span>{folderName}</span>
        </div>
      }
    </li>
  );
};

export default NoteListItem;
