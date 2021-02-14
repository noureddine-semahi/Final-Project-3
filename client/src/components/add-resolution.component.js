import React, { Component } from "react";
import { Link } from "react-router-dom";
import ResolutionDataService from "../services/resolution.service";

export default class AddResolution extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGoals = this.onChangeGoals.bind(this);
    this.saveResolution = this.saveResolution.bind(this);
    this.newResolution = this.newResolution.bind(this);

    this.state = {
      id: null,
      title: "",
      goals: "", 
      achieved: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeGoals(e) {
    this.setState({
      goals: e.target.value
    });
  }

  saveResolution() {
    var data = {
      title: this.state.title,
      goals: this.state.goals
    };

    ResolutionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          goals: response.data.goals,
          achieved: response.data.achieved,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newResolution() {
    this.setState({
      id: null,
      title: "",
      goals: "",
      achieved: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You have successfully submitted your new resolution!</h4>
            <button className="btn btn-success" onClick={this.newResolution}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Resolution</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="goals">Goals</label>
              <input
                type="message"
                className="form-control"
                id="goals"
                required
                value={this.state.goals}
                onChange={this.onChangeGoals}
                name="goals"
              />
            </div>

            <button onClick={this.saveResolution} className="m-3 btn btn-sm btn-primary">
              Submit
            </button>
            <Link
                to={"/resolutions/"}
                className="m-3 btn btn-sm btn-success"
              >
                My Resolutions
            </Link>
          </div>
        )}
      </div>
    );
  }
}
