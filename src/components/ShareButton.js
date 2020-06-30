import React from 'react'
import  styled  from 'styled-components';

export default function ShareButton() {
    const [fallback, setfallback] = useState(false);
    const sharePage=()=>{
        var shareBtn = document.getElementById('share-btn');
        shareFallback = document.getElementById('share-fallback');
        pageTitle = 'Ordrlo';
        pageUrl = window.location.url;

        
        if (navigator.share) {
            navigator.share({
                text: pageTitle,
                url: pageUrl
            });
        } else {
          setfallback(true);
        }

    }
    return (
        <ShareWrapper>
        <div className="share" onClick={sharePage}>
            
            {fallback?
            <div id="share-fallback" className="share-buttons">
            <a className="share-btn fb" href="https://facebook.com/sharer/sharer.php?u=https://pakin.me/blog/create-share-button-with-web-share-api/" target="_blank">Share</a>
            <a className="share-btn tw" href="https://twitter.com/intent/tweet/?text=Web+Share+API+with+fallback&url=https://pakin.me/blog/create-share-button-with-web-share-api/&via=pknme" target="_blank">Tweet</a>
            </div>    
            :
            <div id="share-btn" className="share-btn web-share"></div>
        }
        </div>
        </ShareWrapper>
    )
}

const ShareWrapper = styled.div`
.share {
  margin: 2em 0;
}

.share-buttons {
    display:flex;
  justify-content: space-between;
}

.share-btn {
  display: inline-block;
  padding: 8px 20px;
  background: #00ad45;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.share-btn:hover {
  opacity: .85;
  color: #fff;
}

.share-btn.web-share {
  cursor: pointer;
  width: 100%;
}

.share-btn.tw {
  background: #1da1f2;
  margin: 0 8px 0 0;
}

.share-btn.fb {
  background: #3b5998;
  margin: 0 8px 0 0;
}

.share-btn.pk {
  background: #ef4056;
}
`