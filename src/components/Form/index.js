import React, { Component } from 'react'
import './style.css'
import FormInput from '../FormInput'
import { urlToObject, objectToUrl } from '../../utils'

class Form extends Component {
    constructor(props) {
        super(props)
        const urlParams = window.location.search.slice(1)
        const obj = urlToObject(urlParams)
        this.state = { form: obj }
    }

    handleChange = (inputText, name) => {
        const newform = {
            ...this.state.form,
            [name]: inputText,
        }

        this.setState({ form: newform })
        window.history.pushState('page2', 'Title', '/?' + objectToUrl(newform))
        //console.log(this.state);
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state.form)
        this.setState({ form: {} })
        window.history.pushState('page2', 'Title', '/?' + objectToUrl({}))
    }

    render() {
        return (
            <form id="myForm" onSubmit={this.handleSubmit}>
                <FormInput
                    desc="Name"
                    name="name"
                    value={this.state.form.name || ''}
                    onChange={this.handleChange}
                />
                <FormInput
                    desc="IP"
                    className="funny"
                    value={this.state.form.ip || ''}
                    name="ip"
                    onChange={this.handleChange}
                />
                <FormInput
                    desc="Description"
                    name="description"
                    value={this.state.form.description || ''}
                    onChange={this.handleChange}
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Form
