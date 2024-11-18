import React, { useRef, useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { useQuery } from 'react-query';
import { Volume2, Plus, Minus, Moon, Sun, Maximize, Minimize, Copy, FileText, HelpCircle, MessageCircle } from 'lucide-react';
// @ts-ignore
import mockBook from "../assets/mock.epub";
import { AnimatePresence, motion } from 'framer-motion';
import ProgressUI from '../components/BookProgress';

// const getReaderStyles = (isDarkMode: boolean) => ({
  // container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // overflow: 'scroll',
    // backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
  // },
  // readerArea: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
    // transition: 'background-color 0.3s',
  // },
  // titleArea: {
    // display: 'none',
  // },
  // prev: {
    // display: 'none',
  // },
  // next: {
    // display: 'none',
  // }
// });

const EbookReader: React.FC = () => {
  const [location, setLocation] = useState<string | number>(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(100);
  const [selectedText, setSelectedText] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const renditionRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<any>(null);

  const { data: bookUrl = mockBook, isLoading, error } = useQuery('epub', () => Promise.resolve(mockBook));

  const [contentList, setContentList] = useState([]);

  const flattenToc = (toc: any[]): { title: string; href: string }[] => {
    let flatList: { title: string; href: string }[] = [];
  
    toc.forEach(item => {
      flatList.push({ title: item.label, href: item.href });
      if (item.subitems && item.subitems.length > 0) {
        flatList = flatList.concat(flattenToc(item.subitems));
      }
    });
  
    return flatList;
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        exitFullScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const handleFontSizeChange = (delta: number) => {
    setFontSize(prev => {
      const newSize = Math.max(50, Math.min(200, prev + delta));
      if (renditionRef.current) {
        renditionRef.current.themes.fontSize(`${newSize}%`);
      }
      return newSize;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (renditionRef.current) {
        if (newMode) {
          renditionRef.current.themes.register('dark', {
            '*': { color: '#ffffff !important' },
            'body': { 
              background: '#1a202c !important',
              color: '#ffffff !important'
            },
            'p, div, span, h1, h2, h3, h4, h5, h6': {
              color: '#ffffff !important'
            }
          });
          renditionRef.current.themes.select('dark');
        } else {
          renditionRef.current.themes.register('light', {
            '*': { color: '#000000 !important' },
            'body': {
              background: '#ffffff !important',
              color: '#000000 !important'
            },
            'p, div, span, h1, h2, h3, h4, h5, h6': {
              color: '#000000 !important'
            }
          });
          renditionRef.current.themes.select('light');
        }
      }
      return newMode;
    });
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      exitFullScreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleAIAction = (action: 'summarize' | 'explain') => {
    setAIResponse(action === 'summarize' ? 'This is a summary of the selected text.' : 'This is an explanation of the selected text.');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading eBook</div>;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col h-screen w-full overflow-hidden ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Header */}
      <header className={`bg-secondary text-secondary-foreground p-4 flex justify-between items-center ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
        <h1 className="text-lg md:text-2xl font-bold truncate">{ renditionRef.current && renditionRef.current.book.packaging.metadata.title }</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => speak(selectedText)} className="text-foreground">
            <Volume2 size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleFontSizeChange(-10)} className="text-foreground">
              <Minus size={20} />
            </button>
            <p>{fontSize}%</p>
            <button onClick={() => handleFontSizeChange(10)} className="text-foreground">
              <Plus size={20} />
            </button>
          </div>
          <button onClick={toggleDarkMode} className="text-foreground">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={toggleFullScreen} className="text-foreground">
            {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 h-full">
        <ReactReader
          url={bookUrl}
          location={location}
          locationChanged={(loc: string) => {
            setLocation(loc);
          }}
          getRendition={rendition => {
            renditionRef.current = rendition;
            // console.log(rendition.book.packaging.metadata);
            
            rendition.themes.fontSize(`${fontSize}%`);

            if (isDarkMode) {
              rendition.themes.register('dark', {
                '*': { color: '#ffffff !important' },
                'body': { 
                  background: '#1a202c !important',
                  color: '#ffffff !important'
                },
                'p, div, span, h1, h2, h3, h4, h5, h6': {
                  color: '#ffffff !important'
                }
              });
              rendition.themes.select('dark');
            }

            rendition.on('selected', (cfiRange: string, contents: any) => {
              const text = rendition.getRange(cfiRange).toString();
              if (text.length > 0) {
                setSelectedText(text);
                setShowAIOptions(true);
                console.log(text);
              } else
                setShowAIOptions(false);

              contents.document.addEventListener('mouseup', () => {
                if (contents.window.getSelection()?.toString().length === 0) {
                  setSelectedText('');
                  setShowAIOptions(false);
                }
              });
            });
            rendition.on('relocated', (location: any) => {
              // const flatToc = flattenToc(tocRef.current);
              // console.log("relocated", location);
              setCurrentPage(location.start.index);
            });
          }}
          tocChanged={toc => {
            tocRef.current = toc;
            if (contentList.length == 0 && tocRef.current) {
              let list = flattenToc(toc);
              // console.log("tocChanged", list);
              setContentList(list as []);

              setTotalPages(list.length);
              // console.log(list.length);
            }
            
          }}
          // readerStyles={ ((prev: IReactReaderStyle) =>
            
          //   { return { ...prev
          //     // container: {
          //     //   background: "yellow"
          //     // }
          //   }})
          // }
          epubOptions={{
            flow: 'paginated',
            manager: 'default'
          }}
          // swipeable
        />
      </div>

     {/* Progress bar */}
      <ProgressUI currentPage={currentPage} totalPages={totalPages} isDarkMode={isDarkMode} />

      {/* AI options popup */}
      <AnimatePresence>
        {showAIOptions && selectedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed z-10 bottom-24 right-24 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg ${isDarkMode ? 'dark:bg-gray-700' : ''}`}
          >
            <div className="flex space-x-4">
              <button onClick={() => navigator.clipboard.writeText(selectedText)} className="flex items-center">
                <Copy size={20} className="mr-2" /> Copy
              </button>
              <button onClick={() => handleAIAction('summarize')} className="flex items-center">
                <FileText size={20} className="mr-2" /> Summarize
              </button>
              <button onClick={() => handleAIAction('explain')} className="flex items-center">
                <HelpCircle size={20} className="mr-2" /> Explain
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI response dialog */}
      <AnimatePresence>
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-4 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg max-w-md ${isDarkMode ? 'dark:bg-gray-700' : ''}`}
          >
            <h3 className="text-xl font-bold mb-4">AI Response</h3>
            <p>{aiResponse}</p>
            <button
              onClick={() => setAIResponse('')}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Chatbot toggle */}
       <button
        onClick={() => setShowChatbot(!showChatbot)}
        className={`fixed z-10 bottom-4 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg ${isDarkMode ? 'dark:bg-blue-600' : ''}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot placeholder */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed z-10 bottom-16 right-4 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg w-64 ${isDarkMode ? 'dark:bg-gray-700' : ''}`}
          >
            <h3 className="text-lg font-bold mb-2">Chatbot</h3>
            <p>This is a placeholder for the chatbot feature.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EbookReader;
