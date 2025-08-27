//useAnalytics.tsx
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const useAnalytics = () => {
  const pathname = usePathname();
  const clickCount = useRef<number>(0);
  const hasTrackedView = useRef<boolean>(false);
  const sessionStartTime = useRef<number>(0);
  const previousPathname = useRef<string>('');
  const sessionId = useRef<string>('');
  const visitedPages = useRef<Set<string>>(new Set());

  //Generate session ID once per browser session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    //Check if we already have a session ID for this browser session
    let currentSessionId = sessionStorage.getItem('analytics_session_id');
    
    if (!currentSessionId) {
      //Generate new session ID: timestamp + random string
      currentSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', currentSessionId);
      
      //Track when this session started
      sessionStorage.setItem('analytics_session_start', Date.now().toString());
    }
    
    sessionId.current = currentSessionId;
    
    //Get visited pages for this session to track unique page visits
    const visitedPagesStr = sessionStorage.getItem('analytics_visited_pages');
    if (visitedPagesStr) {
      visitedPages.current = new Set(JSON.parse(visitedPagesStr));
    }
  }, []);

  //Track clicks on the page
  useEffect(() => {
    const handleClick = () => {
      clickCount.current += 1;
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClick);
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleClick);
      }
    };
  }, []);

  //Track initial page view (only once per page visit)
  useEffect(() => {
    if (typeof window === 'undefined' || hasTrackedView.current) return;

    const trackPageView = async () => {
      try {
        sessionStartTime.current = Date.now();
        
        //Check if this is the first time visiting this page in this session
        const isFirstVisitToPage = !visitedPages.current.has(pathname);
        
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            totalClicks: 0,
            sessionId: sessionId.current,
            isInitialView: true,
            isFirstVisitToPage: isFirstVisitToPage // New flag for unique page visits
          }),
        });
        
        //Mark this page as visited in this session
        visitedPages.current.add(pathname);
        sessionStorage.setItem('analytics_visited_pages', JSON.stringify([...visitedPages.current]));
        
        hasTrackedView.current = true;
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  //Send click data when user leaves page or navigates to new page
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sendClickData = async (pageToTrack: string) => {
      if (clickCount.current > 0 && pageToTrack) {
        try {
          const data = JSON.stringify({
            page: pageToTrack,
            totalClicks: clickCount.current,
            sessionId: sessionId.current,
            isInitialView: false,
            isFirstVisitToPage: false // This is just a click update
          });

          //Use sendBeacon for reliable tracking
          if (navigator.sendBeacon) {
            const blob = new Blob([data], { type: 'application/json' });
            navigator.sendBeacon('/api/analytics/track', blob);
          } else {
            //Fallback for browsers that don't support sendBeacon
            await fetch('/api/analytics/track', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: data,
              keepalive: true
            });
          }
          
          console.log(`Sent ${clickCount.current} clicks for page: ${pageToTrack}`);
        } catch (error) {
          console.error('Analytics click tracking error:', error);
        }
      }
    };

    const handleBeforeUnload = () => {
      sendClickData(pathname);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendClickData(pathname);
      }
    };

    //Multiple event listeners for better coverage
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  //Handle page changes - send clicks from previous page
  useEffect(() => {
    //If we have a previous page with clicks, send them
    if (previousPathname.current && clickCount.current > 0) {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: previousPathname.current,
          totalClicks: clickCount.current,
          sessionId: sessionId.current,
          isInitialView: false,
          isFirstVisitToPage: false
        }),
      }).then(() => {
        console.log(`Navigation: Sent ${clickCount.current} clicks for ${previousPathname.current}`);
      }).catch(error => {
        console.error('Analytics click tracking error on navigation:', error);
      });
    }

    //Update previous pathname and reset counters
    previousPathname.current = pathname;
    clickCount.current = 0;
    hasTrackedView.current = false;
    sessionStartTime.current = 0;
  }, [pathname]);

  return {};
};

export default useAnalytics;