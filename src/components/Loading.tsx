import { useEffect, useRef } from 'react';
import loadingIcon from '../assets/loading.svg';
function Loading({isLoading, children}: { isLoading: boolean; children: React.ReactNode }) {
    const loadingRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if(loadingRef.current) {
          loadingRef.current.focus();
        }
      })
    
    return (
        <>
      {isLoading ? (
        <p aria-live='assertive' ref={loadingRef} tabIndex={0}><img src={loadingIcon} alt="Loading icon" className='loading-icon'/>Loading...</p>
      ) : (
        <>
          {children}
        </>
      )}
    </>
    );
}

export default Loading;