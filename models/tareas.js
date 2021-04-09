const colors = require("colors");
const Tarea = require("./tarea");
class Tareas {
  _listado = {};
  constructor() {
    this._listado = {};
  }

  changeStateTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listaTareas.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      console.log("entre");
      delete this._listado[id];
    }
    console.log("hoy simon");
  }
  get listaTareas() {
    //Crear el array donde iran los objects
    const arrayLista = [];
    //Mando a llamar la funcion Object y el me permite obtener las llaves del objeto
    //utilizando .keys ella recibe como parametro el objeto y luego con forEach recorro el
    //el array de llaves, luego voy introduciendo cada llave a una tarea y esa la empujo al
    // al nuevo arrayLista con push en cada iteracion me metera una nueva tarea y para terminar
    //retorno el arrayLista
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      arrayLista.push(tarea);
    });
    return arrayLista;
  }
  cargarTareasFromArray(tareas = []) {
    //console.log('tu madre doggy');
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto() {
    //console.log(this.listaTareas);
    this.listaTareas.forEach((tarea, index) => {
      let i = `${index + 1 + "."}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      console.log(`${i} ${desc} :: ${estado}`);
    });
  }
  listarPendientesCompletadas(completadas = true) {
    if (completadas) {
      let arrayComplete = [];
      arrayComplete = this.listaTareas.filter(
        (tareas) => tareas.completadoEn !== null
      );
      arrayComplete.forEach((tarea, index) => {
        let i = `${index + 1 + "."}`.green;
        const { desc, completadoEn } = tarea;
        const estado = completadoEn ? "Completado".green : "Pendiente".red;
        return console.log(`${i} ${desc} :: ${estado}`);
      });
    } else {
      let arrayPending = [];
      arrayPending = this.listaTareas.filter(
        (tareas) => tareas.completadoEn == null
      );
      arrayPending.forEach((tarea, index) => {
        let i = `${index + 1 + "."}`.green;
        const { desc, completadoEn } = tarea;
        const estado = completadoEn ? "Completado".green : "Pendiente".red;
        return console.log(`${i} ${desc} :: ${estado}`);
      });
    }
  }
}
module.exports = Tareas;
