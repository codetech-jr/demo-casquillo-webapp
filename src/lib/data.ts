export type Category =
  | "Todo"
  | "Entradas"
  | "Raciones"
  | "Ensaladas"
  | "Carnes y Aves"
  | "Parrillas"
  | "Del Mar"
  | "Pizzas y Hamburguesas"
  | "Bebidas"
  | "Licores";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  imagePlaceholder?: string; // We'll use this for the Lucide Icon name or placeholder text
}

export type TableStatus = "free" | "occupied";
export type TableZone = "Tarima" | "Terraza VIP";

export interface Table {
  id: string;
  number: number;
  zone: TableZone;
  status: TableStatus;
}

export const CATEGORIES: Category[] = [
  "Todo",
  "Entradas",
  "Raciones",
  "Ensaladas",
  "Carnes y Aves",
  "Parrillas",
  "Del Mar",
  "Pizzas y Hamburguesas",
  "Bebidas",
  "Licores"
];

export const MENU_ITEMS: MenuItem[] = [
  // ENTRADAS
  { id: "e1", name: "Tabla Casquillo", description: "Alas de BBQ, dedos de mozarella, tequeños, arepitas, papas fritas y trío de salsas.", price: 14.0, category: "Entradas", isAvailable: true },
  { id: "e2", name: "Sopa del día", description: "Nuestra sopa tradicional del día.", price: 5.0, category: "Entradas", isAvailable: true },
  { id: "e3", name: "Ceviche clásico", description: "Ceviche tradicional con pescado blanco fresco.", price: 12.0, category: "Entradas", isAvailable: true },
  { id: "e4", name: "Carpaccio de lomito", description: "Finas láminas de lomito bañadas en aderezos y parmesano.", price: 9.0, category: "Entradas", isAvailable: true },
  { id: "e5", name: "Dedos de mozzarella", description: "5 unidades. Servidos en salsa napolitana.", price: 7.0, category: "Entradas", isAvailable: true },
  { id: "e6", name: "Camarones rebosados", description: "Acompañados de papas fritas crujientes.", price: 12.0, category: "Entradas", isAvailable: true },
  { id: "e7", name: "Chupe de pollo y camarones", description: "El clásico chupe con la combinación perfecta de mar y tierra.", price: 8.0, category: "Entradas", isAvailable: true },

  // RACIONES
  { id: "r1", name: "Tequeños", description: "8 deliciosos tequeños venezolanos con salsa de la casa.", price: 7.0, category: "Raciones", isAvailable: true },
  { id: "r2", name: "Arepitas con nata", description: "Arepitas fritas crujientes acompañadas de nata criolla.", price: 6.0, category: "Raciones", isAvailable: true },
  { id: "r3", name: "Papas rústicas", description: "Papas rústicas condimentadas.", price: 5.0, category: "Raciones", isAvailable: true },
  { id: "r4", name: "Chorizo a la parrilla", description: "Cuatro unidades de chorizo ahumado.", price: 7.0, category: "Raciones", isAvailable: true },

  // ENSALADAS
  { id: "s1", name: "Ensalada Mixta", description: "Tomate, cebolla, aguacate, palmito y lechuga.", price: 5.0, category: "Ensaladas", isAvailable: true },
  { id: "s2", name: "Ensalada César con Pollo", description: "Mix de lechugas, croutones, parmesano y aderezo César (1 pers).", price: 9.0, category: "Ensaladas", isAvailable: true },

  // CARNES Y AVES
  { id: "c1", name: "Lomito a la plancha o grill", description: "Corte premium jugoso con el contorno de tu preferencia.", price: 17.0, category: "Carnes y Aves", isAvailable: true },
  { id: "c2", name: "Bandeja de Pork Belly", description: "800g de crujiente Pork Belly horneado.", price: 26.0, category: "Carnes y Aves", isAvailable: true },
  { id: "c3", name: "Rack de costillas", description: "Exquisito rack bañado en salsa BBQ. Con 2 contornos.", price: 45.0, category: "Carnes y Aves", isAvailable: true },
  { id: "c4", name: "1 Pollo en brasa", description: "Jugoso pollo entero en brasa con 2 contornos de su preferencia.", price: 20.0, category: "Carnes y Aves", isAvailable: true },
  { id: "c5", name: "Pollo a la canasta", description: "400g de pollo empanizado. Acompañado por papas fritas y cubos de mozzarella.", price: 12.0, category: "Carnes y Aves", isAvailable: true },
  { id: "c6", name: "Milanesa a la parmesana", description: "Deliciosa milanesa cubierta de salsa y queso fundido. Acompañada por 2 contornos.", price: 16.0, category: "Carnes y Aves", isAvailable: true },

  // PARRILLAS
  { id: "p1", name: "Parrilla Mixta (1 pers)", description: "Jugosa carne de res, pollo, cochino, chorizo y morcilla.", price: 18.0, category: "Parrillas", isAvailable: true },
  { id: "p2", name: "Parrilla Casquillo (4 pers)", description: "2.8kg de jugosa carne de res, pollo, cochino, chorizo y morcilla.", price: 65.0, category: "Parrillas", isAvailable: true },
  { id: "p3", name: "Parrilla Mar y Tierra (2 pers)", description: "Lomito, pollo, calamares, camarones, pulpo en cama de papas fritas y vegetales asados.", price: 35.0, category: "Parrillas", isAvailable: true },

  // DEL MAR
  { id: "d1", name: "Churrasco de Salmón", description: "Fresco salmón importado al grill con contornos.", price: 25.0, category: "Del Mar", isAvailable: true },
  { id: "d2", name: "Churrasco de Mero", description: "Mero fresco pesca del día.", price: 18.0, category: "Del Mar", isAvailable: true },
  { id: "d3", name: "Canoa de mariscos", description: "Mariscos seleccionados en salsa especial de la casa.", price: 14.0, category: "Del Mar", isAvailable: true },

  // PIZZAS Y HAMBURGUESAS
  { id: "f1", name: "Hamburguesa de Oro", description: "2 carnes de 160g, tocineta, huevo, queso kraff, lechuga, tomate y mayo ahumada.", price: 12.0, category: "Pizzas y Hamburguesas", isAvailable: true },
  { id: "f2", name: "Hamburguesa Casquillo", description: "Lomito, milanesa de pollo y chorizo preparadas a la parrilla, cebolla, tomate, lechuga, pico de gallo.", price: 10.0, category: "Pizzas y Hamburguesas", isAvailable: true },
  { id: "f3", name: "Pizza Casquillo (M)", description: "Mediana: Queso mozzarella, lomito, chorizo, tocineta, cebolla y pimentón.", price: 16.0, category: "Pizzas y Hamburguesas", isAvailable: true },
  { id: "f4", name: "Pizza Della Nonna (M)", description: "Mediana: Salsa bechamel, jamón, tocineta, cebolla y parmesano.", price: 15.0, category: "Pizzas y Hamburguesas", isAvailable: true },
  { id: "f5", name: "Pasticho Tradicional", description: "Laminas de pasta precocida, carne molida, salsa bechamel, queso mozzarella.", price: 9.0, category: "Pizzas y Hamburguesas", isAvailable: true },

  // BEBIDAS
  { id: "b1", name: "Limonada frappé con hierbabuena", description: "Refrescante bebida tropical.", price: 2.5, category: "Bebidas", isAvailable: true },
  { id: "b2", name: "Jugo de Fresa", description: "Jugo natural.", price: 2.5, category: "Bebidas", isAvailable: true },
  { id: "b3", name: "Merengada de Fresa", description: "Merengada cremosa con topping dulce.", price: 3.0, category: "Bebidas", isAvailable: true },

  // LICORES
  { id: "l1", name: "Servicio Buchanan's 12", description: "Botella con servicio completo a la mesa.", price: 55.0, category: "Licores", isAvailable: true },
  { id: "l2", name: "Mojito Clásico", description: "Ron blanco, hierbabuena, fruta y azúcar.", price: 4.0, category: "Licores", isAvailable: true },
  { id: "l3", name: "Tobo de Polar Light / Pilsen", description: "10 Cervezas Polar bien frías.", price: 15.0, category: "Licores", isAvailable: false },
  { id: "l4", name: "Tobo de Solera Premium", description: "10 Cervezas verde o azul.", price: 15.0, category: "Licores", isAvailable: true },
  { id: "l5", name: "Sangría Casquillo ESP", description: "Jarra de 1L con fruta picada.", price: 20.0, category: "Licores", isAvailable: true },
];

export const TABLES: Table[] = [
  { id: "t1", number: 1, zone: "Tarima", status: "occupied" },
  { id: "t2", number: 2, zone: "Tarima", status: "free" },
  { id: "t3", number: 3, zone: "Tarima", status: "free" },
  { id: "t4", number: 4, zone: "Terraza VIP", status: "free" },
  { id: "t5", number: 5, zone: "Terraza VIP", status: "occupied" },
  { id: "t6", number: 6, zone: "Terraza VIP", status: "free" },
];
