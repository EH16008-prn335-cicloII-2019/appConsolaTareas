require("colors");
const {
  inquirerMenu,
  pausa,
  mensajeria,
  done,
  listaTareasBorrar,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    if (opt !== "0") {
      switch (opt) {
        case "1":
          const desc = await mensajeria("¿Ingrese su tarea?");
          tareas.crearTarea(desc);

          break;
        case "2":
          console.log(tareas.listaTareas);
          tareas.listadoCompleto();
          // const leido = leerDB();
          // console.log(leido);
          break;
        case "3":
          tareas.listarPendientesCompletadas(true);
          break;
        case "4":
          tareas.listarPendientesCompletadas(false);
          break;
        case "5":
          const estadoTareas = await done(tareas.listaTareas);
          tareas.changeStateTareas(estadoTareas);
          //console.log(estadoTareas);
          break;
        case "6":
          const id = await listaTareasBorrar(tareas.listaTareas);
          tareas.borrarTarea(id);
          break;
      }
      guardarDB(tareas.listaTareas);
      await pausa();
    }
  } while (opt !== "0");
};
main();
