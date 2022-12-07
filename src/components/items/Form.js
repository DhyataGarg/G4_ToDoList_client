import { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../UI/Card'
import classes from './form.module.css'

const QuoteForm = () => {
  const titleInputRef = useRef()
  const textInputRef = useRef()
  const navigate = useNavigate()

  function submitFormHandler(event) {
    event.preventDefault()

    const enteredTitle = titleInputRef.current.value
    const enteredText = textInputRef.current.value

    var apiUrl = `http://localhost:5000/create-new-item`
    axios
      .post(apiUrl, {
        title: enteredTitle,
        description: enteredText,
      })
      .then(function (response) {
        console.log(response)
        navigate("/items")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Description</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn">Add Item</button>
          </div>
        </form>
      </Card>
    </Fragment>
  )
}

export default QuoteForm
