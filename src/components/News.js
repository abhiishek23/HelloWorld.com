import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const { apiKey, category, pageSize, country, setProgress } = props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        setProgress(10);
        const url = `https://gnews.io/api/v4/search?q=${category}&lang=en&country=${country}&max=${pageSize}&token=${apiKey}`;
        setLoading(true);
        try {
            let response = await fetch(url);
            setProgress(30);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let parsedData = await response.json();
            setProgress(70);
            setArticles(parsedData.articles || []);
            setTotalResults(parsedData.totalArticles || 0);
            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://gnews.io/api/v4/search?q=${category}&lang=en&country=${country}&max=${pageSize}&token=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Update articles and page state using functional update
            setArticles(prevArticles => [...prevArticles, ...(data.articles || [])]);
            setPage(nextPage);
            setTotalResults(data.totalArticles || 0);
        } catch (error) {
            console.error('Error fetching more articles:', error);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                Headlines.com - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            {loading && <Spinner />}
            {articles && articles.length > 0 && (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => (
                                <div className="col-md-4" key={index}>
                                    <NewsItem
                                        title={element.title || ''}
                                        description={element.description || ''}
                                        imageUrl={element.image}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name || 'Unknown'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

News.defaultProps = {
    category: 'general',
    pageSize: 10,
    country: 'us', // Default country
};

News.propTypes = {
    apiKey: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;

