import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isSubmittedForm: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isSubmittedForm: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isSubmittedForm: false,
      })
    }
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state
    return firstNameInput !== ''
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    return lastNameInput !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  renderFirstNameInputField = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'input-name-field error-field'
      : 'input-name-field'
    return (
      <>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            className={className}
            placeholder="First name"
            value={firstNameInput}
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
        </div>
      </>
    )
  }

  renderLastNameInputField = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'input-name-field error-field'
      : 'input-name-field'
    return (
      <>
        <div className="input-container">
          <label className="input-label" htmlFor="lastName">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            className={className}
            placeholder="Last name"
            value={lastNameInput}
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
        </div>
      </>
    )
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    return (
      <>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          {this.renderFirstNameInputField()}
          {showFirstNameError && <p className="error-message">Required</p>}
          {this.renderLastNameInputField()}
          {showLastNameError && <p className="error-message">Required</p>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isSubmittedForm: !prevState.isSubmittedForm,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSuccessfullySubmittingForm = () => (
    <>
      <div className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
          alt="success"
          className="success-image"
        />
        <p>Submitted Successfully</p>
        <button
          type="button"
          className="submit-button"
          onClick={this.onClickSubmitAnotherResponse}
        >
          Submit Another Response
        </button>
      </div>
    </>
  )

  render() {
    const {isSubmittedForm} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="title">Registration</h1>
        <div className="view-container">
          {isSubmittedForm
            ? this.renderSuccessfullySubmittingForm()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
