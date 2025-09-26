import {Publicacion} from "./publicacion";

export interface Usuario {
  id?: number;
  username: string;
  email: number;
  name: string;
  password: string;
  status: number;
  publicaciones?: Publicacion[];
}

