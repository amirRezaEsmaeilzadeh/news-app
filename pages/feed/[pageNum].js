import styles from "../../styles/feed.module.css";
import { Toolbar } from "../../component/Toolbar";
import { useRouter } from "next/router";

export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        {articles.map((articles, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = articles.url)}>
              {articles.title}
            </h1>
            {!!articles.urlToImage && (
              <img src={articles.urlToImage} alt="article-image" />
            )}
            <p>{articles.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          className={pageNumber === 1 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber > 1) {
              router
                .push(`/feed/${pageNumber - 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
        >
          Previous Page
        </div>

        <div>#{pageNumber}</div>

        <div
          className={pageNumber === 5 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber < 5) {
              router
                .push(`/feed/${pageNumber + 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.pageNum;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  ).then((res) => res.json());

  const { articles } = apiResponse;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
