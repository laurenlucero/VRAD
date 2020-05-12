import React from 'react'
import './SignIn.css'
import PropTypes from 'prop-types'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            purpose: '',
            error: false
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({[name]: value})
    }

    handleClick = () => { 
    this.handleInputError() ? this.props.setUser(this.state) : this.setState({error: true})
    }

    handleInputError = () => {
        return !this.state.name === '' || !this.state.email === '' || !this.state.purpose === ''
    }

    render() {

        return(
            <section className='signIn-form'>
                <h3>Welcome, please sign in:</h3>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <input
                    type='text'
                    name='email'
                    placeholder='Enter your email'
                    value={this.state.email}
                    onChange={this.handleChange}
                 />

                 <select
                    name='purpose'
                    onChange={this.handleChange}>
                    <option value=''>-- Please choose a purpose --</option>
                    <option value='business'>Business</option>
                    <option value='vacation'>Vacation</option>
                    <option value='fugitive'>Fugitive on the Run</option>
                 </select>
                {this.state.error && <p>Please fill out all inputs to sign in.</p>}
                 <button className='signIn-btn' onClick={this.handleClick}>Sign In</button>

            </section>
        )
    }
}

export default SignIn 

SignIn.propTypes = {

}