import React from "react";
import CreateBook from "./CreateBook";
import Books from "./Books";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
    this.getBooks = this.getBooks.bind(this);
    this.getBook = this.getBook.bind(this);
    this.createBook = this.createBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getBooks() {
    this.setState({ loading: true }, () => {
      fetch("https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books")
        .then(res => res.json())
        .then(result =>
          this.setState({
            loading: false,
            alldata: result
          })
        )
        .catch(console.log);
    });
  }

  handleChange(event) {
    var title = this.state.singledata.title;
    var author = this.state.singledata.author;
    var year = this.state.singledata.releaseDate;
    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;

    this.setState({
      singledata: {
        title: title,
        author: author,
        year: year
      }
    });
  }

  createBook() {
    fetch("https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    }).then(
      this.setState({
        singledata: {
          title: "",
          author: "",
          year: ""
        }
      })
    );
  }

  getBook(event, id) {
    this.setState(
      {
        singledata: {
          title: "Loading...",
          author: "Loading...",
          year: ""
        }
      },
      () => {
        fetch("https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books/" + id)
          .then(res => res.json())
          .then(result => {
            this.setState({
              singledata: {
                title: result.title,
                author: result.author ? result.author : "",
                year: result.releaseDate
              }
            });
          });
      }
    );
  }

  updateBook(event, id) {
    fetch("https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: "",
            year: ""
          }
        });
        this.getBooks();
      });
  }

  deleteBook(event, id) {
    fetch("https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: "",
            year: ""
          }
        });
        this.getBooks();
      });
  }

  render() {
    const bookTable = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <Books
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getBook={this.getBook}
        updateBook={this.updateBook}
        deleteBook={this.deleteBook}
        handleChange={this.handleChange}
      />
    );
    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getBooks}
          >
            Get Books
          </button>
          <CreateBook
            singledata={this.state.singledata}
            createBook={this.createBook}
            handleChange={this.handleChange}
          />
        </span>
        <br />
        {bookTable}
      </div>
    );
  }
}

export default App;