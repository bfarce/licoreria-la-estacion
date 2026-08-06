export interface Producto {
  id: string;
  nombre: string;
  marca: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
  presentacion: string;
  disponible: boolean;
  destacado: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
}
