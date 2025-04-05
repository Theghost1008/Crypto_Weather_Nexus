import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchNews,
  fetchNewsQuery,
  setSearchQuery,
  clearSearchResults
} from '@/store/newsSlice';
import Sidebar from '@/components/Sidebar';
import { wrapper } from '@/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      await store.dispatch(fetchNews());
      return { props: {} };
    } catch (error) {
      console.error("SSR Fetch Error:", error);
      return { 
        props: { 
          ssrError: "Failed to load initial news data" 
        } 
      };
    }
  }
);


const NewsDetails = ({ssrError}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data = [],
    searchData = [],
    loading = false,
    error = ssrError||null,
    searchQuery = 'crypto'
  } = useSelector((state) => state.news);
  
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const { id } = router.query;

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchNews());
    }
  }, [dispatch, data.length, loading, error]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = localQuery.trim() || 'crypto';
    dispatch(setSearchQuery(query));
    dispatch(fetchNewsQuery(query));
  };

  const displayData = (searchQuery === 'crypto' ? data : searchData) || [];
  const currentArticle = id ? data.find(article => article.id === id) : null;

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center items-center min-h-[50vh] flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 flex-1">
          <div className="bg-red-100 rounded-lg p-6 max-w-2xl w-full text-center">
            <p className="text-red-600 font-medium mb-4">Error: {error}</p>
            <button 
              onClick={() => searchQuery === 'crypto' ? dispatch(fetchNews()) : dispatch(fetchNewsQuery(searchQuery))}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex'>
      <Sidebar/>
      <div className="container mx-auto px-4 py-8 flex-1">
        {!currentArticle && (
          <div className="mb-12 bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Crypto News Explorer</h1>
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search crypto news..."
                  className="flex-1 border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md w-full sm:w-auto"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-3">
              {['Bitcoin', 'Ethereum', 'NFT', 'DeFi', 'Blockchain'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setLocalQuery(term);
                    dispatch(setSearchQuery(term));
                    dispatch(fetchNewsQuery(term));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    searchQuery === term
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
        {currentArticle ? (
          <ArticleDetail article={currentArticle} />
        ) : (
          <NewsGrid articles={displayData} />
        )}
      </div>
    </div>
  );
};

const ArticleDetail = ({ article }) => {
  if (!article) return null;
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to news
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="font-medium">{article.source_id || 'Unknown Source'}</span>
          <span>{new Date(article.pubDate || Date.now()).toLocaleDateString()}</span>
        </div>
        
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" fill="%23E5E7EB"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236B7280" font-family="sans-serif" font-size="14">No Image</text></svg>'
              )}`;
            }}
          />
        )}
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">{article.description}</p>
          {article.content && (
            <p className="whitespace-pre-line text-gray-600 mb-8">{article.content}</p>
          )}
          
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Read Full Article
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const NewsGrid = ({ articles = [] }) => {
  const safeArticles = Array.isArray(articles) ? articles.filter(Boolean) : [];
  if (!safeArticles || safeArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl shadow-md p-8 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-700">No articles found</h3>
          <p className="text-gray-500 mt-1">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
      {safeArticles.map(article => (
        <div key={article.id || Math.random()} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" fill="%23E5E7EB"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236B7280" font-family="sans-serif" font-size="14">No Image</text></svg>'
                )}`;
              }}
            />
          )}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{article.source_id}</span>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsDetails;