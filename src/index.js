import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";
import PastEvents from "./pages/PastEvents";
import Events from "./pages/Events";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Forms from "./components/SignUp/Forms";
import Tickets from "./pages/Tickets.jsx";
import SuccessBuyTicket from "./pages/SuccessBuyTicket.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Categories from "./pages/admin/Category/Categories.jsx";

import EventPhotos from "./pages/admin/EventPhotos/EventPhotos.jsx";

import TicketCategories from "./pages/admin/TicketCategories/TicketCategories.jsx";
import Users from "./pages/admin/Users/Users.jsx";
import CategoryAddForm from "./pages/admin/Category/CategoryAddForm.jsx";

import ProtectedRouteAdmin from "./pages/admin/ProtectedRouteAdmin.jsx";
import CategoryUpdateForm from "./pages/admin/Category/CategoryUpdateForm.jsx";
import EventsAdmin from "./pages/admin/Events/EventsAdmin.jsx";
import EventUpdateForm from "./pages/admin/Events/EventUpdateForm.jsx";
import EventAddForm from "./pages/admin/Events/EventAddForm.jsx";
import Artists from "./pages/admin/Artists/Artists.jsx";
import ArtistAddForm from "./pages/admin/Artists/ArtistAddForm.jsx";
import ArtistUpdateForm from "./pages/admin/Artists/ArtistUpdateForm.jsx";
import TicketCategoriesAddForm from "./pages/admin/TicketCategories/TicketCategoriesAddForm.jsx";
import TicketCategoriesUpdateForm from "./pages/admin/TicketCategories/TicketCategoriesUpdateForm.jsx";
import Seats from "./pages/admin/Seats/Seats.jsx";
import SeatAddForm from "./pages/admin/Seats/SeatAddForm.jsx";
import SeatUpdateForm from "./pages/admin/Seats/SeatUpdateForm.jsx";
import EventPhotoAddForm from "./pages/admin/EventPhotos/EventPhotoAddForm.jsx";
import EventPhotoUpdateForm from "./pages/admin/EventPhotos/EventPhotoUpdateForm.jsx";
import TicketPriceAddForm from "./pages/admin/TicketPrice/TicketPriceAddForm.jsx";
import AssignTicketForm from "./pages/admin/AssignTicket/AssignTicketForm.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./components/ProfileComp/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Forms />,
  },
  {
    path: "/register",
    element: <Forms />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/pastevents",
    element: <PastEvents />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:categoryName",
    element: <Events />,
  },

  {
    path: "/event/tickets/:id",
    element: <Tickets />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/event/ticket/success",
    element: <SuccessBuyTicket />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Dashboard",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Categories",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Categories />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/addCategory",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <CategoryAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Categories/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <CategoryUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Artists",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Artists />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Artists",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Artists />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/addArtist",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <ArtistAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Artist/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <ArtistUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Events",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventsAdmin />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Event/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/addEvent",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/EventPhotos",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventPhotos />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },

  {
    path: "admin/addEventPhoto",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventPhotoAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/EventPhoto/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventPhotoUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Seats",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Seats />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/AddSeat",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <SeatAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Seats/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <SeatUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Users",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/TicketCategories",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <TicketCategories />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/addTicketCategories",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <TicketCategoriesAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/TicketCategories/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <TicketCategoriesUpdateForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },

  {
    path: "admin/addTicketPrice",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <TicketPriceAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },

  {
    path: "admin/AssignTicket/:id",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <AssignTicketForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "contact",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
