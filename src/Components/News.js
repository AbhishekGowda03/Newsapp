import React, { Component } from "react";
import Newitems from "./Newitems";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=apple&from=2022-12-09&to=2022-12-09&sortBy=popularity&apiKey=3aef6706ec274ffa97bf5350d999dca7";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles ,totalResults :parsedData.totalResults });
  }

  handlePrevClick = async () => {
    console.log("previos");
    let url =
      `https://newsapi.org/v2/everything?q=apple&from=2022-12-09&to=2022-12-09&sortBy=popularity&apiKey=3aef6706ec274ffa97bf5350d999dca7&page=${this.state.page%20+1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handleNextClick = async () => {
    console.log("next");
    if( this.state.page+5>Math.ceil(this.state.totalResults/20)){}
    else{
    let url =
      `https://newsapi.org/v2/everything?q=apple&from=2022-12-09&to=2022-12-09&sortBy=popularity&apiKey=3aef6706ec274ffa97bf5350d999dca7&page=${this.state.page%20+1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });}
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <h2>News Top headlines</h2>

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newitems
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between  ">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
