import React from 'react'
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';

function Books(props) {
    var rows = [];
    props.alldata.forEach(element => {
        rows.push(
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.title}</td>
            <td>{element.author_id}</td>
            <td>{element.releaseDate}</td>
            <td><UpdateBook
                elementId={element.id}
                singledata={props.singledata}
                getBook={props.getBook}
                updateBook={props.updateBook}
                handleChange={props.handleChange}></UpdateBook></td>
            <td>
                <DeleteBook
                elementId={element.id}
                singledata={props.singledata}
                getBook={props.getBook}
                deleteBook={props.deleteBook}></DeleteBook>
            </td>
        </tr>)
    });
    return(
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Year Published</th>
                  <th>Update</th>
                  <th>Delete</th>
              </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
    )
}

export default Books;