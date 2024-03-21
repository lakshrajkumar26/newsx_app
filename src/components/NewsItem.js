import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source} = this.props;
    return (
      <div class="my-3">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position :'absolute',
            right:'0'
          }
          }>
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{source}
              </span>
              </div>
          <img src={imageUrl} alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">     
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            {/* By {author} mtln aagr ye null hua to false aajaegah|toh by!? :not of null true of jaegah aur Unknown print hojgaega (aagr author null h to unknown print ka ternary operator)                   on {date} */}

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
