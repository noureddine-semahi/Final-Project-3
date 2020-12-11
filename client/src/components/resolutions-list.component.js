import React, { Component } from "react";
import ResolutionDataService from "../services/resolution.service";
import { Link } from "react-router-dom";

export default class ResolutionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveResolutions = this.retrieveResolutions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveResolution = this.setActiveResolution.bind(this);
    this.removeAllResolutions = this.removeAllResolutions.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      resolutions: [],
      currentResolution: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveResolutions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveResolutions() {
    ResolutionDataService.getAll()
      .then(response => {
        this.setState({
          resolutions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveResolutions();
    this.setState({
      currentResolution: null,
      currentIndex: -1
    });
  }

  setActiveResolution(Resolution, index) {
    this.setState({
      currentResolution: Resolution,
      currentIndex: index
    });
  }

  removeAllResolutions() {
    ResolutionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentResolution: null,
      currentIndex: -1
    });

    ResolutionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          resolutions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, resolutions, currentResolution, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Resolutions List</h4>

          <ul className="list-group">
            {resolutions &&
              resolutions.map((resolution, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveResolution(resolution, index)}
                  key={index}
                >
                  {resolution.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllResolutions}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentResolution ? (
            <div>
              <h4>Resolution</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentResolution.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentResolution.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentResolution.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/resolutions/" + currentResolution.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Resolution...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
