import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true, //here loading equal to false
      page: 1,
    };
    // document.title = `${this.props.category}-NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34bc2ede89264648815c8a7220656a17&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      // totalResults: parsedData.totalResults,
      loading: false,
      totalResults: 0,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    //learn it
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34bc2ede89264648815c8a7220656a17&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    }); //by this we are calling inside by api only
  }

  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34bc2ede89264648815c8a7220656a17&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`; //` back tick
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   //means if not of !()
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34bc2ede89264648815c8a7220656a17&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`; //` back tick    let data = await fetch(url);
    //   this.setState({ loading: true });
    //   let data = await fetch(url); //loadintg tb tb chlegi jb jb ye url fetch karega
    //   let parsedData = await data.json();
    //   this.setState({ loading: false }); // jasie hi data aagya set it false
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false, //can club here tooo
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34bc2ede89264648815c8a7220656a17&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "40px 0px", marginTop: "90px" }}
        >
          NewsMonkey - Top Headlines
        </h1>
        {/* 1 br for js n 1 for object */}

        {this.state.loading && <Spinner />}
        {/* learn synatx here t.s.l is equal true then show spinner else don't */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults} //check if
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" >
                    <NewsItem
                      key={element.url}
                      title={element.title} //.slice(0,45)
                      description={element.description} //88
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name} //first area of passing props  by articles ref
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreiousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
