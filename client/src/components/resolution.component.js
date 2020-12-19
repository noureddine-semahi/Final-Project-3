import React, { Component } from "react";
import { Link } from "react-router-dom";
import ResolutionDataService from "../services/resolution.service";

export default class Resolution extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGoals = this.onChangeGoals.bind(this);
    this.getResolution = this.getResolution.bind(this);
    this.updateAchieved = this.updateAchieved.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.deleteResolution = this.deleteResolution.bind(this);

    this.state = {
      currentResolution: {
        id: null,
        title: "",
        goals: "",
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

  onChangeGoals(e) {
    const goals = e.target.value;
    
    this.setState(prevState => ({
      currentResolution: {
        ...prevState.currentResolution,
        goals: goals
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
      goals: this.state.currentResolution.goals,
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
                <label htmlFor="goals">Goals</label>
                <input
                  type="text"
                  className="form-control"
                  id="goals"
                  value={currentResolution.goals}
                  onChange={this.onChangeGoals}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentResolution.achieved ? "Achieved" : "Working on it"}
              </div>
            </form>

            {currentResolution.achieved ? (
              <button
                className="btn btn-dark mr-2"
                onClick={() => this.updateAchieved(false)}
              >
                Work more
              </button>
            ) : (
              <button
                className="btn btn-info mr-2"
                onClick={() => this.updateAchieved(true)}
              >
                Achieved
              </button>
            )}

              <button
                className="btn btn-danger mr-2"
                onClick={this.deleteResolution}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-warning"
                onClick={this.updateResolution}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            <Link
                to={"/resolutions/"}
                className="btn btn-success"
              >
                My Resolutions
            </Link>
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
