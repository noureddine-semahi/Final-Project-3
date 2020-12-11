import React, { Component } from "react";
import ResolutionDataService from "../services/resolution.service";

export default class Resolution extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getResolution = this.getResolution.bind(this);
    this.updateAchieved = this.updateAchieved.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.deleteResolution = this.deleteResolution.bind(this);

    this.state = {
      currentResolution: {
        id: null,
        title: "",
        description: "",
        achieved: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getResolution(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResolution: {
          ...prevState.currentResolution,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentResolution: {
        ...prevState.currentResolution,
        description: description
      }
    }));
  }

  getResolution(id) {
    ResolutionDataService.get(id)
      .then(response => {
        this.setState({
          currentResolution: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAchieved(status) {
    var data = {
      id: this.state.currentResolution.id,
      title: this.state.currentResolution.title,
      description: this.state.currentResolution.description,
      achieved: status
    };

    ResolutionDataService.update(this.state.currentResolution.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentResolution: {
            ...prevState.currentResolution,
            achieved: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateResolution() {
    ResolutionDataService.update(
      this.state.currentResolution.id,
      this.state.currentResolution
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The resolution was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteResolution() {    
    ResolutionDataService.delete(this.state.currentResolution.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/resolutions')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentResolution } = this.state;

    return (
      <div>
        {currentResolution ? (
          <div className="edit-form">
            <h4>Resolution</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentResolution.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentResolution.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentResolution.achieved ? "Achieved" : "Still working on it"}
              </div>
            </form>

            {currentResolution.achieved ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAchieved(false)}
              >
                Work more
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAchieved(true)}
              >
                Achieved !!
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteResolution}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateResolution}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Resolution...</p>
          </div>
        )}
      </div>
    );
  }
}
