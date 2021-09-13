import React from 'react'
import Table from 'react-bootstrap/Table'

class TableComponent extends React.Component{
    constructor(properties){
        super(properties);
        this.state={
            error:null,
            isLoaded:false,
            items:[]
        };
    }
    componentDidMount() {
        fetch(process.env.NODE_ENV === "production" ? "https://graphing-report-tool.herokuapp.com/test" : "http://localhost:5000/test")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    { ()=>{
                         let header=[];
                         for(let i=0;i<Object.keys(items[0]).length;i++){
                            header.push(<th>{Object.keys(items[0])[i]}</th>);
                         }
                         return header;
                    }
                    }
                    </tr>
                </thead>
                <tbody>
              {
                 ()=>{
                    let rows=[];
                    for(let i=0;i<items.length;i++){
                        for(let j=0;j<items[i].length;j++){
                            rows.push(<td>{items[i][j]}</td>);
                        }
                    }
                    return rows;
               }
              }
            </tbody>
            </Table>
          );
        }
      }

}

export default TableComponent
