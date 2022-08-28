import { useParams } from "react-router-dom"; //useParams lee la ID que está en la URL
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:3000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 500);
    };
    obtenerClienteAPI();
  }, []);
  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente:{" "}
        <span className="text-yellow-600 text-3xl">{cliente.nombre}</span>
      </h1>
      <p className="mt-3">Información del Cliente</p>
      {cliente.nombre && (
        <p className="text-3xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Nombre: </span>
          {cliente.nombre}
        </p>
      )}
      {cliente.email && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {cliente.email}
        </p>
      )}
      {cliente.telefono && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
          {cliente.telefono}
        </p>
      )}
      {cliente.empresa && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Empresa: </span>
          {cliente.empresa}
        </p>
      )}
      {cliente.notas && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};
export default VerCliente;
