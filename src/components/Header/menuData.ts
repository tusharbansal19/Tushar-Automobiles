import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Auto Parts",
    newTab: false,
    path: "/shop-with-sidebar",
    submenu: [
      {
        id: 21,
        title: "Engine Oil & Fluids",
        newTab: false,
        path: "/shop-with-sidebar?category=engine-oil",
      },
      {
        id: 22,
        title: "Brake Parts",
        newTab: false,
        path: "/shop-with-sidebar?category=brake-parts",
      },
      {
        id: 23,
        title: "Filters & Air",
        newTab: false,
        path: "/shop-with-sidebar?category=filters",
      },
      {
        id: 24,
        title: "Lights & Electrical",
        newTab: false,
        path: "/shop-with-sidebar?category=lights",
      },
      {
        id: 25,
        title: "Wheels & Tyres",
        newTab: false,
        path: "/shop-with-sidebar?category=wheels",
      },
      {
        id: 26,
        title: "Suspension & Steering",
        newTab: false,
        path: "/shop-with-sidebar?category=suspension",
      }
    ]
  },
  {
    id: 3,
    title: "Services",
    newTab: false,
    path: "/services",
    submenu: [
      {
        id: 31,
        title: "Car Maintenance",
        newTab: false,
        path: "/services/maintenance",
      },
      {
        id: 32,
        title: "Oil Change",
        newTab: false,
        path: "/services/oil-change",
      },
      {
        id: 33,
        title: "Brake Service",
        newTab: false,
        path: "/services/brake-service",
      },
      {
        id: 34,
        title: "Tyre Installation",
        newTab: false,
        path: "/services/tyre-installation",
      }
    ]
  },
  {
    id: 4,
    title: "About",
    newTab: false,
    path: "/about",
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Account",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "My Account",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 62,
        title: "Order History",
        newTab: false,
        path: "/orders",
      },
      {
        id: 63,
        title: "Wishlist",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 64,
        title: "Cart",
        newTab: false,
        path: "/cart",
      },
      {
        id: 65,
        title: "Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 66,
        title: "Sign In",
        newTab: false,
        path: "/signin",
      },
      {
        id: 67,
        title: "Sign Up",
        newTab: false,
        path: "/signup",
      }
    ]
  }
];