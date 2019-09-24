import React from "react"
import CardBook from "../CardBook"
import RowCategory from "../RowCategory"
import MyAppBar from "../MyAppBar"

// export default class App extends React.Component {
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             <Headline>aaa ajadsajaja!!!</Headline>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }



// {this.state.todos.map(item => (
//     <div key={item.id}>
//       <h1>{item.titulo}</h1>
//       <span>{item.precio}</span>
//     </div>
//   ))}

{/* <div>
{this.state.todos.map(item => (
  <div key={item.id}>
      <CardBook titulo={item.titulo} descipcion={item.libro_descripcion} cantidad={item.cantidad} src_imagen={item.miniatura_url} ></CardBook>
  </div>
))}
</div> 
 */}

export default class App extends React.Component {  
  constructor(props) {
    super(props);
    this.es_libro= {v_libro: props.esLibro, id: props.id, nombre_categoria:props.nombre_categoria, url : props.url};
  }
    state = {
        todos: []
      }; 
      async componentDidMount() {
        try {
          var ask_url = 'http://127.0.0.1:8000/rest/categorias/';
          if(this.es_libro.v_libro!=undefined) {
                ask_url= 'http://127.0.0.1:8000/rest/libros/categoria/'+this.es_libro.id;
              }
              else{
                this.es_libro.v_libro= false;
                ask_url='http://127.0.0.1:8000/rest/categorias/';
              }
          const res = await fetch(ask_url);
          const todos = await res.json();
          this.setState({
            todos
          });
        } catch (e) {
          console.log(e);
        }
      }
      render() {
        return (
            <div>
              <MyAppBar estado={this.es_libro}></MyAppBar> 
              <RowCategory categorias={this.state.todos} esLibro={this.es_libro.v_libro} ></RowCategory>
            </div>
        );
      }
  }
  