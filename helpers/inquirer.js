require("colors");
const inquirer = require("inquirer");
//const Tarea = require("./models/tarea");
//const Tareas = require("./models/tareas");
const Tareas = require("../models/tareas");
const tareas = new Tareas();
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué Deseas Hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tareas`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("================================".green);
  console.log("        Lista de tareas   ".white.bold);
  console.log("================================".green);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green}`,
    },
  ];
  await inquirer.prompt(question);
};
const mensajeria = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length == 0) {
          return "Ingrese una tarea por favor";
        } else {
          return true;
        }
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};
const listaTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tareas, index) => {
    return {
      value: tareas.id,
      name: `${index + 1 + "."} ${"Descripcion:" + tareas.desc}`,
    };
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "¿Qué Tareas Deseas Borrar?",
      choices: choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  const confirmacion = [
    {
      type: "confirm",
      name: "confirm",
      message: "¿Estás Seguro?",
      default: false,
    },
  ];
  const { confirm } = await inquirer.prompt(confirmacion);
  if (confirm) {
    return id;
  } else {
    return null;
  }
};
const done = async (tareas = []) => {
  const choices = tareas.map((tareas, index) => {
    return {
      value: tareas.id,
      name: `${index + 1 + "."} ${"Descripcion:" + tareas.desc}`,
      checked: tareas.completadoEn ? true : false,
    };
  });
  const changeState = [
    {
      type: "checkbox",
      message: "Marque las tareas completadas",
      name: "estado",
      choices: choices,
    },
  ];
  const { estado } = await inquirer.prompt(changeState);
  return estado;
};

module.exports = {
  inquirerMenu,
  pausa,
  mensajeria,
  done,
  listaTareasBorrar,
};
